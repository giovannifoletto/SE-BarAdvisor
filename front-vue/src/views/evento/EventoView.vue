<template>
  <div>
    <Errors :error="error" />

    <div class="event" v-if="evento">
      <div class="title">
        <h3>{{ evento.nome[0].toUpperCase() + evento.nome.slice(1, 1000) }}</h3>
      </div>

      <div class="description text-center">
        <h5>{{ evento.descrizione }}</h5>

        <router-link
          :to="{
            name: 'paginaLocale',
            params: { localeID: evento.locale._id, eventoID: eventoID },
          }"
        >
          <Secondary title="Visita il Locale gestore dell'evento" />
        </router-link>


<!-- v-if="$store.state.user.locale === evento.locale._id" -->
        <router-link
          :to="{
            name: 'formInviaNotifica',
            params: { localeID: evento.locale._id },
          }"
          
        >
          <Primary title="Invia una notifica a questo evento" />
        </router-link>

        <div v-if="$store.state.token" class="py-2">
          <Primary
            title="Prenota"
            v-if="!utentePrenotato"
            @buttonClicked="postPrenotazione"
          />
          <Secondary
            title="Cancella prenotazione"
            v-if="utentePrenotato"
            @buttonClicked="deletePrenotazione"
          />
        </div>
      </div>

      <div class="comments">
        <div class="info-comments px-4 mt-3 mb-2">
          <h3>Commenti</h3>

          <div class="form-recensione" v-if="$store.state.token">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                required
                v-model="commento.commento"
              />
              <div class="input-group-append">
                <Primary title="Commenta" @buttonClicked="postCommento" />
              </div>
            </div>
          </div>
          <div class="comm-row">
            <Commento
              v-for="commento in evento.commenti"
              :key="commento._id"
              :commento="commento.commento"
              :idUtente="commento.utente"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Errors from "@/components/Errors.vue";
import Commento from "@/components/Commento.vue";

export default {
  name: "paginaEvento",
  props: ["eventoID"],
  components: {
    Primary,
    Secondary,
    Errors,
    Commento,
  },
  data() {
    return {
      evento: null,
      utentePrenotato: false,
      commento: {
        utente: null,
        commento: "",
      },
      error: {
        status: false,
        messaggio: "Messaggio di default.",
      },
    };
  },
  methods: {
    async postCommento() {
      this.commento.utente = this.$store.state.user.id;

      console.log(this.commento);

      const opzioneRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify(this.commento),
      };
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/eventi/${this.eventoID}/commenti`,
          opzioneRichiesta
        );
        const data = await res.json();

        if (data.success) {
          this.$router.go();
        } else {
          this.error.status = true;
          this.error.messaggio =
            data.error || data.message || "Errore interno, riprovare.";
        }
      } catch (error) {
        this.error.status = true;
        this.error.messaggio = error || "Errore imprevisto, ripro.";
      }
    },
    async postPrenotazione() {
      const opzioniRichiesta = {
        method: "POST",
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };

      const res = await fetch(
        `http://localhost:4000/api/v1/eventi/${this.eventoID}/prenotazioni`,
        opzioniRichiesta
      );
      const data = await res.json();

      if (data.success) this.utentePrenotato = true;
      else {
        this.error.status = true;
        this.error.messaggio = data?.error || data?.message;
      }
    },
    async deletePrenotazione() {
      const opzioniRichiesta = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };

      const res = await fetch(
        `http://localhost:4000/api/v1/eventi/${this.eventoID}/prenotazioni`,
        opzioniRichiesta
      );
      const data = await res.json();

      if (data.success) this.utentePrenotato = false;
      else {
        this.error.status = true;
        this.error.messaggio = data?.error || data?.message;
      }
    },
  },
  async mounted() {
    try {
      const res = await fetch(
        "http://localhost:4000/api/v1/eventi/" + this.eventoID
      );
      const data = await res.json();

      if (data.success) {
        this.evento = data.evento;
        this.evento.prenotazioni.forEach((usr) => {
          if (usr._id === this.$store.state.user.id)
            this.utentePrenotato = true;
        });
      }
    } catch (error) {
      console.log(error);
      this.error.status = true;
      this.error.messaggio = error || "Errore del server, riprovare.";
    }
  },
};
</script>

<style scoped>
.event {
  display: flex;
  flex-flow: column nowrap;
  border-radius: 4px;
  justify-content: baseline;
}

.title {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  justify-items: baseline;
  padding: 10px;
  border-bottom: 1px solid black;
}

.description {
  display: flex;
  flex-flow: column;
  align-content: center;
  padding-top: 0.5rem;
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
  flex-flow: column;
  justify-content: space-between;
  justify-items: baseline;
}

.comm-row {
  display: relative;
}
</style>