<template>
  <div class="post" v-if="locale">

    <div class="title">
      <div class="head-title">
        <div class="title-account">
          <Account />
        </div>
        <h3>
          {{ locale.nome[0].toUpperCase() + locale.nome.slice(1, 1000) }}
        </h3>
      </div>

      <div class="bio">
        <div class="bio-title">
          <h4>Descrizione Locale</h4>
          <button class="beer-button">
            {{ Math.round(locale.ranking * 10) / 10 }} / 5
            <div class="">
              <Beer :active="true" />
            </div>
          </button>
        </div>
        <div>
          <h5>{{ locale.descrizione }}</h5>
        </div>
      </div>
    </div>

    <div v-if="isGestore">
      <router-link :to="{ name: 'formCreazioneEvento' }">
        <Primary title="Crea Evento" />
      </router-link>
    </div>

    <div class="final-button mt-3 mb-1" v-if="$store.state.token && $store.state.user.ruolo === 'Cliente'">
      <div class="p-1">
        <div class="p-1 text-center">
          <Primary title="Segui" @buttonClicked="followLocale" v-if="!isFollower" />
          <Secondary title="Non seguire più" @buttonClicked="unfollowLocale" v-if="isFollower" />
        </div>
      </div>
    </div>

    <div class="comments" v-if="prossimiEventi">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Prossimi Eventi</h3>
      </div>
      <div v-if="prossimiEventi.length != 0">
        <div class="comm-row">
          <CardEvento v-for="evento in prossimiEventi" :key="evento._id" :evento="evento" @error="handleError" />
        </div>
      </div>
      <div v-else>
        <Message :isSuccess="false" :messaggio="{
          status: true,
          messaggio: 'Nessun evento in programma.',
        }" />
      </div>
    </div>

    <div class="comments" v-if="eventiPassati">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Eventi Passati</h3>
      </div>
      <div v-if="eventiPassati.length != 0">
        <div class="comm-row">
          <CardEvento v-for="evento in eventiPassati" :key="evento._id" :evento="evento" @error="handleError" />
        </div>
      </div>
      <div v-else>
        <Message :isSuccess="false" :messaggio="{
          status: true,
          messaggio: 'Nessun evento in programma.',
        }" />
      </div>
    </div>

    <!-- RECENSIONI -->

    <div class="comments">
      <h3>Recensioni</h3>

      <!-- FORM RECENSIONE -->

      <div class="form-recensione" v-if="$store.state.token">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Inserisci nuovo commento" required
            v-model="recensione.commento" />
          <div class="input-group-append">
            <select class="
                custom-select
                border-top border-bottom
                py-1
                rounded
                text-center
              " v-model="recensione.votazione" required>
              <option value="" disabled selected>Vota</option>
              <option :value="index" v-for="index in 5" :key="index">
                {{ index }}
              </option>
            </select>
            <Primary title="Commenta" @buttonClicked="postRecensione" />
          </div>
        </div>
      </div>

      <!-- ELENCO RECENSIONI -->

      <div class="comm-row">
        <Recensione v-for="recensione in locale.recensioni" :key="recensione._id" :recensione="recensione"
          @messaggio="handleMessage" @error="handleError" />
      </div>
    </div>

    <!-- BOTTONI CAMBIA PASSWORD E ELIMINA ACCOUNT -->

    <div class="final-button mt-3 mb-1" v-if="isGestore">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Sezione Personale</h3>
      </div>
      <div class="p-1">
        <div class="p-1 text-center">
          <router-link :to="{ name: 'fromCambiaPassword' }">
            <Primary title="Cambia password" />
          </router-link>
        </div>

        <div class="p-1 text-center">
          <Primary title="Elimina Account" @buttonClicked="cancellaAccount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardEvento from "@/components/CardEvento";
import Ranking from "@/components/Ranking";
import Account from "@/components/icons/Account";
import Message from "@/components/Message";
import Primary from "@/components/buttons/Primary";
import Recensione from "@/components/Recensione";
import Errors from "@/components/Errors";
import Beer from "@/components/icons/Beer";

import config from "@/config";
import deleteAccount from '@/lib/deleteAccount'
import Secondary from "../../components/buttons/Secondary.vue";

export default {
  name: "paginaLocale",
  props: ["localeID"],
  components: {
    CardEvento,
    Ranking,
    Account,
    Message,
    Primary,
    Recensione,
    Errors,
    Beer,
    Secondary
  },
  data() {
    return {
      locale: null,
      prossimiEventi: null,
      eventiPassati: null,
      isGestore: false,
      isFollower: false,
      recensione: {
        commento: "",
        votazione: "",
        utente: "",
        locale: "",
      },
      error: {
        status: false,
        messaggio: "",
      }
    };
  },
  methods: {
    handleMessage(event) {
      this.$emit('messaggio', event)
    },
    handleError(event) {
      this.$emit('error', event)
    },
    async cancellaAccount() {
      const { data, error } = await deleteAccount()

      if (data.success) {
        this.$router.push({ name: 'home' })
        this.$store.commit('resetToken')
      }
      else {
        this.error = error
        this.$emit('error', this.error)
      }
    },
    async postRecensione() {
      if (!this.recensione.commento || !this.recensione.votazione) {
        this.error.status = true
        this.error.messaggio = "Compilare tutti i campi."

        this.handleError(this.error)
        return;
      }

      this.recensione.locale = this.localeID;
      this.recensione.utente = this.$store.state.user.id;

      const opzioniRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify(this.recensione),
      };
      try {
        const res = await fetch(
          `${config.baseURL}/locali/${this.localeID}/recensioni`,
          opzioniRichiesta
        );

        const data = await res.json();

        if (!data.success) {
          this.error.status = true;
          this.error.messaggio = data?.error || data?.message

          this.handleError(this.error)
        } else this.$router.go()
      } catch (error) {
        this.error.status = true
        this.error.messaggio = error

        this.handleError(this.error)
      }
    },
    async followLocale() {
      const opzioneRichiesta = {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      }

      try {
        const res = await fetch(`${config.baseURL}/locali/${this.localeID}/segui`, opzioneRichiesta)
        const data = await res.json()

        if (data.success) {
          this.isFollower = true
        }
        else {
          this.error.status = true;
          this.error.messaggio = data?.error || data?.message

          this.handleError(this.error)
        }

      } catch (error) {
        this.error.status = true
        this.error.messaggio = error

        this.handleError(this.error)
      }
    },
    async unfollowLocale() {
      const opzioneRichiesta = {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      }

      try {
        const res = await fetch(`${config.baseURL}/locali/${this.localeID}/segui`, opzioneRichiesta)
        const data = await res.json()

        if (data.success) {
          this.isFollower = false
        }
        else {
          this.error.status = true;
          this.error.messaggio = data?.error || data?.message

          this.handleError(this.error)
        }

      } catch (error) {
        this.error.status = true
        this.error.messaggio = error

        this.handleError(this.error)
      }
    }
  },
  async mounted() {
    try {
      const res = await fetch(`${config.baseURL}/locali/${this.localeID}`);
      const data = await res.json();

      if (data.success) {
        this.locale = data.locale;

        if (this.$store.state.token && this.localeID === this.$store.state.user?.locale)
          this.isGestore = true

        if (this.$store.state.token && this.$store.state.user.ruolo === 'Cliente') {
          this.locale.followers.forEach(usr => {
            if (String(usr) === this.$store.state.user.id)
              this.isFollower = true
          })
        }

        this.prossimiEventi = data.prossimiEventi;
        this.eventiPassati = data.eventiPassati;
      }
    } catch (error) {
      this.error.status = true
      this.error.messaggio = error || "Errore del server, riprovare."

      this.handleError(this.error)
    }

  },
};
</script>

<style scoped>
.post {
  display: flex;
  flex-flow: column nowrap;
  border-radius: 4px;
}

.title {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid black;
}

.title-account {
  padding-right: 1rem;
}

.title-locale-name {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.title-locale-row {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.bio-title {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  justify-items: baseline;
}

.head-title {
  display: flex;
  flex-flow: row;
  gap: 10px;
}

.first-title {
  display: flex;
  flex-flow: row;
}

.comments {
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  align-content: space-around;
  justify-content: space-evenly;
  padding-top: 0.5rem;
}

.info-comments {
  display: flex;
  flex-flow: row;
  justify-content: center;
  justify-items: baseline;
}

.comm {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}

.comm-row {
  display: relative;
}

.form-group {
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
}

.custom-select {
  background-color: white;
  border: none;
  margin-left: 1px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -ms-appearance: none;
  padding-left: 1rem;
  padding-right: 1rem;
}

.custom-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.3rem var(--secondaryOrange);
}

.beer-button {
  border: 1px solid var(--primary);
  background: none;
  color: #ff9922;
  font: inherit;
  padding-top: 0.1rem;
  cursor: pointer;
  outline: inherit;
  border-radius: 4px;
  display: flex;
  flex-flow: row;
  align-items: baseline;
  column-gap: 3px;
  margin: 0;
}

.beer-button:hover {
  border: 1px solid #c27419;
  color: #c27419;
}
</style>
