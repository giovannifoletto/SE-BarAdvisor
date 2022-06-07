<template>
  <div>
    <Errors :error="error" />

    <div class="event" v-if="eventoCaricato">
      <img class="image" :src="copertina" v-if="copertinaCaricata" />
      <div class="title">
        <h3>{{ evento.nome[0].toUpperCase() + evento.nome.slice(1, 1000) }}</h3>
      </div>

      <div class="description text-center">
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
          v-if="$store.state.user?.locale === evento?.locale?._id"
        >
          <Primary title="Invia una notifica a questo evento" />
        </router-link>

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
              :commento="commento.commento"
              :idUtente="commento.utente"
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
    </div>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Errors from "@/components/Errors.vue";
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
    Errors,
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
      this.commento.utente = this.$store.state?.user.id;

      console.log(this.commento);

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
          this.error.status = true;
          this.error.messaggio =
            data.error || data.message || "Errore interno, riprovare.";
        }
      } catch (error) {
        this.error.status = true;
        this.error.messaggio = error || "Errore imprevisto, riprovare.";
      }
    },
    async postPrenotazione() {
      const { data, error } = await postPrenotazione(this.eventoID);
      this.error = error;

      if (data.success) {
        this.utentePrenotato = true;
      }
    },
    async deletePrenotazione() {
      const { data, error } = await deletePrenotazione(this.eventoID);
      this.error = error;

      if (data.success) {
        this.utentePrenotato = false;
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
      }

      // se l'evento ha la copertina, recuperala
      if (this.evento.copertina) {
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

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: "Select some files";
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>