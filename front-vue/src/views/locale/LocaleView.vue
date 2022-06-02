<template>
  <div class="post" v-if="locale">
    <div class="title">
      <div class="first-title">
        <div class="title-account">
          <Account />
        </div>
        <h3>{{ locale.nome }}</h3>
        <div class="ranking">
          <Ranking :ranking="Math.round(locale.ranking)" />
        </div>
      </div>

      <div class="bio-title">
        <h4>Descrizione Locale</h4>
        <h5>{{ locale.descrizione }}</h5>
      </div>
    </div>

    <div v-if="localeID === $store.state.user.locale && $store.state.token">
      <router-link :to="{ name: 'formCreazioneEvento' }">
        <Primary title="Crea Evento" />
      </router-link>
    </div>

    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Prossimi Eventi</h3>
      </div>
      <div v-if="prossimiEventi.length != 0">
        <div class="comm-row">
          <CardEvento
            v-for="evento in prossimiEventi"
            :key="evento._id"
            :evento="evento"
          />
        </div>
      </div>
      <div v-else>
        <Message
          :isSuccess="false"
          :message="{ status: true, text: 'Nessun evento in programma.' }"
        />
      </div>
    </div>

    <div class="comments" >
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Eventi Passati</h3>
      </div>
      <div v-if="eventiPassati.length != 0">
        <div class="comm-row">
          <CardEvento
            v-for="evento in eventiPassati"
            :key="evento._id"
            :evento="evento"
          />
        </div>
      </div>
      <div v-else>
      <Message
          :isSuccess="false"
          :message="{ status: true, text: 'Nessun evento in programma.' }"
        />
    </div>
    </div>
    

    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Recensioni</h3>

        <Errors :error="error" />

        <div class="form-recensione" v-if="$store.state.token">
          <div>
            <input
              type="text"
              class="form-control"
              required
              v-model="recensione.commento"
            />
            <div>
                <select v-model="recensione.votazione" required>
                  <option :value="index" v-for="index in 5" :key="index">{{index}}</option>
                </select>
            </div>
            <Primary title="Commenta" @buttonClicked="postRecensione"/>
          </div>
        </div>

      </div>
      <div class="comm-row">
        <Recensione
          v-for="recensione in locale.recensioni"
          :key="recensione._id"
          :recensione="recensione"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardEvento from "@/components/CardEvento.vue";
import Ranking from "@/components/Ranking";
import Account from "@/components/icons/Account";
import Message from "@/components/Message";
import Primary from "@/components/buttons/Primary";
import Recensione from "@/components/Recensione";
import Errors from '@/components/Errors';

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
    Errors
  },
  data() {
    return {
      locale: null,
      prossimiEventi: null,
      eventiPassati: null,
      recensione: {
        commento: "", 
        votazione: "",
        utente: "",
        locale: ""
      }, 
      error : {
        status: false,
        text: "Messaggio di default."
      }
    };
  },
  methods:{
    async postRecensione(){

      this.recensione.locale = this.localeID
      this.recensione.utente = this.$store.state.user.id

      const opzioniRichiesta = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.$store.state.token}` },
        body: JSON.stringify(this.recensione)
      }
      try {
        const res = await fetch(`http://localhost:4000/api/v1/locali/${this.localeID}/recensioni`, opzioniRichiesta)

        const data = await res.json();

        if(!data.success){
          this.error.status =  true
          this.error.messaggio = data.error || data.message || "Errore del server, riprovare."
        } else this.$router.go()
      } catch (error) {
        console.log(error)
        this.error.status =  true
        this.error.messaggio = error || "Errore del server, riprovare."
      }
    }
  },
  async mounted() {
    const res = await fetch(
      `http://localhost:4000/api/v1/locali/${this.localeID}`
    );
    const data = await res.json();

    if (data.success) {
      this.locale = data.locale;
      this.prossimiEventi = data.prossimiEventi;
      this.eventiPassati = data.eventiPassati;
    }
  },
};
</script>


<style>
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
.first-title {
  display: flex;
  flex-flow: row;
  gap: 10px;
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
</style>
