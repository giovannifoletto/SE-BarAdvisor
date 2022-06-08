<template>
  <div>
    <div class="event" v-if="eventoCaricato">
      <div class="title">
        <h3>{{ evento.nome[0].toUpperCase() + evento.nome.slice(1, 1000) }}</h3>
        <div v-if="$store.state.token && !eventoScaduto" class="py-2">
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

      <div class="description text-center">
        <div>
          <img class="image" :src="copertina" v-if="copertinaCaricata" />
        </div>

        <div class="p-4">
          <h5>{{ evento.descrizione }}</h5>

          <router-link
            :to="{
              name: 'paginaLocale',
              params: { localeID: evento?.locale?._id },
            }"
          >
            <Secondary title="Visita il Locale gestore dell'evento" />
          </router-link>
          <router-link
            :to="{
              name: 'formInviaNotifica',
              params: { localeID: evento?.locale?._id, eventoID: eventoID },
            }"
            v-if="isGestore"
          >
            <Primary title="Invia una notifica a questo evento" />
          </router-link>
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
          <div class="comm-row" v-if="evento.commenti.length != 0">
            <Commento
              v-for="commento in evento.commenti"
              :key="commento._id"
              :commento="commento"
            />
          </div>
          <div v-else>
            <Message
              :isSuccess="false"
              :messaggio="{
                status: true,
                messaggio: 'Ancora nessun commento.',
              }"
            />
          </div>
        </div>
      </div>

      <div class="final-button mt-3 mb-1" v-if="isGestore">
        <div class="p-1">
          <div class="p-1 text-center">
            <Primary title="Elimina Evento" @buttonClicked="cancellaEvento" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Message from "@/components/Message";
import Commento from "@/components/Commento.vue";
import axios from "axios";

import config from "@/config";
import postPrenotazione from "@/lib/postPrenotazione";
import deletePrenotazione from "@/lib/deletePrenotazione";

export default {
  name: "paginaEvento",
  props: ["eventoID"],
  components: {
    Primary,
    Secondary,
    Message,
    Commento,
  },
  data() {
    return {
      evento: null,
      eventoScaduto: false,
      eventoCaricato: false,
      utentePrenotato: false,
      copertina: null,
      copertinaCaricata: false,
      isGestore: false,
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
    async cancellaEvento() {
      const opzioneRichiesta = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };

      try {
        const res = await fetch(
          `${config.baseURL}/locali/${this.$store.state.user.locale}/eventi/${this.eventoID}`,
          opzioneRichiesta
        );
        const data = await res.json();

        if (data.success) {
          this.$router.push({
            name: "paginaLocale",
            params: { localeID: this.$store.state.user.locale },
          });
        } else {
          this.error = {
            status: true,
            messaggio: data?.messaggio || data?.error,
          };
          this.$emit("error", this.error);
        }
      } catch (error) {
        this.error = { status: true, messaggio: error };
        this.$emit("error", this.error);
      }
    },
    async postCommento() {
      this.commento.utente = this.$store.state?.user.id;

      const opzioneRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify(this.commento),
      };

      try {
        const res = await fetch(
          `${config.baseURL}/eventi/${this.eventoID}/commenti`,
          opzioneRichiesta
        );
        const data = await res.json();

        if (data.success) {
          this.$router.go();
        } else {
          this.error = { status: true, messaggio: data.error || data.message };
          this.$emit("error", this.error);
        }
      } catch (error) {
        this.error = { status: true, messaggio: error };
        this.$emit("error", this.error);
      }
    },
    async postPrenotazione() {
      const { data, error } = await postPrenotazione(this.eventoID);
      this.error = error;

      if (data.success) this.utentePrenotato = true;
      else {
        this.evento = { status: true, error: error };
        this.$emit("error", this.error);
      }
    },
    async deletePrenotazione() {
      const { data, error } = await deletePrenotazione(this.eventoID);

      if (data.success) this.utentePrenotato = false;
      else {
        this.evento = { status: true, error: error };
        this.$emit("error", this.error);
      }
    },
  },
  async mounted() {
    try {
      // get informazioni dell'evento
      const res = await fetch(`${config.baseURL}/eventi/${this.eventoID}`);
      const data = await res.json();

      if (data.success) {
        this.evento = data.evento;
        this.eventoCaricato = true;
        if (Date.parse(this.evento.dataInizio) < Date.now())
          this.eventoScaduto = true;
        this.evento.prenotazioni.forEach((usr) => {
          if (usr._id === this.$store.state?.user?.id)
            this.utentePrenotato = true;
        });
        if (this.$store.state.user?.locale === this.evento?.locale?._id)
          this.isGestore = true;
      }

      // se l'evento ha la copertina, recuperala
      if (this.evento?.copertina) {
        // get immagine dell'evento
        const response = await axios.get(
          `${config.baseURL}/eventi/${this.eventoID}/copertina`
        );

        if (response.data.success) {
          var bytes = new Uint8Array(response.data.imm.file.data.data);
          var binary = bytes.reduce(
            (data, b) => (data += String.fromCharCode(b)),
            ""
          );
          this.copertina = `data:${
            response.data.imm.file.contentType
          };base64,${btoa(binary)}`;
          this.copertinaCaricata = true;
        }
      }
    } catch (error) {
      this.error.status = true;
      this.error.messaggio = error || "Errore del server, riprovare.";
      this.$emit("error", this.error);
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
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px;
  border-bottom: 1px solid black;
}

.description {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 0.5rem;
}
.image{
  width: 100%;
  height: auto;
  object-fit: cover;
  padding: 2px;
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