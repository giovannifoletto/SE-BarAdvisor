
<template>
  <main>

    <form>
      <div>
        <h1 class="text-center">Crea un nuovo Evento</h1>
        <div class="form-group">
          <label for="nomeEvento">Nome Evento</label>
          <input v-model="evento.nome" type="text" class="form-control" placeholder="Inserisci nome evento" required />
        </div>
        <br />
        <div class="form-group">
          <label for="descrizioneEvento">Descrizione</label>
          <input v-model="evento.descrizione" type="text" class="form-control" placeholder="Inserisci breve descrizione"
            required />
        </div>
        <br />
        <div class="form-group">
          <label for="dataInizio">Data Inizio</label>
          <input v-model="evento.dataInizio" type="datetime-local" class="form-control"
            placeholder="Inserisci data inizio evento" required />
        </div>
      </div>

      <!-- FORM CARICAMENTO IMMAGINE -->

      <div class="custom-file">
        <img class="image" :src="preview" v-if="preview" />

        <input type="file" class="custom-file-input" id="1" @change="fileSelezionato" hidden />

        <label class="custom-file-label pl-2" for="1" v-if="!preview">Seleziona Immagine</label>
        <label class="custom-file-label pl-2" v-if="preview" @click="annullaSelezione">Rimuovi selezione
          immagine</label>
      </div>

      <div class="myflex">
        <Primary title="Conferma" @buttonClicked="postEvento" />
        <router-link :to="{ name: 'paginaLocale', props: { localeID: localeID } }">
          <Secondary title="Annulla" />
        </router-link>
      </div>
    </form>
  </main>
</template>

<script>
import Errors from "@/components/Errors";
import Primary from "@/components/buttons/Primary";
import Secondary from "@/components/buttons/Secondary";
import FormImmagine from "@/components/FormImmagine.vue";

import config from "@/config";
import axios from 'axios'

export default {
  components: {
    Errors,
    Primary,
    Secondary,
    FormImmagine,
  },
  props: ["localeID"],
  data() {
    return {
      evento: {
        nome: "",
        dataInizio: "",
        descrizione: "",
      },
      immagine: null,
      preview: null,
      copertina: null,
      copertinaCaricata: false,
      error: {
        messaggio: null,
        status: false,
      },
      eventoID: null,
    };
  },
  methods: {
    fileSelezionato(event) {
      this.immagine = event.target.files[0]
      this.preview = URL.createObjectURL(this.immagine)
    },
    annullaSelezione() {
      this.preview = null
      document.getElementById("1").value = ""
    },
    async postEvento() {
      const token = this.$store.token || localStorage.getItem("token")
      const opzioniRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.evento),
      };

      try {
        const res = await fetch(`${config.baseURL}/locali/${this.localeID}/eventi`, opzioniRichiesta)
        const data = await res.json()

        if (data.success) {
          const success = await this.caricaFoto(data.eventoID)

          if (success) this.$router.push({ name: "paginaLocale" })
          // aggiungere "else" cancella evento creato

        } else {
          this.error.status = true;
          this.error.messaggio = data?.message || data?.error

          this.$emit('error', this.error)
        }
      } catch (error) {
        this.error.status = true
        this.error.messaggio = error

        this.$emit('error', this.error)
      }
    },
    async caricaFoto(eventoID) {
      if (!this.immagine) {
        return true
      }

      const fd = new FormData();
      fd.append("immagine", this.immagine);

      try {
        const res = await axios.post(`${config.baseURL}/eventi/${eventoID}/copertina`, fd);

        if (!res.data.success) {
          this.error.status = true
          this.error.messaggio = res.data?.error || res.data?.message

          this.$emit('error', this.error)

          return false
        }
        else return true

      } catch (error) {
        this.error.status = true
        this.error.messaggio = error

        this.$emit('error', this.error)

        return false
      }
    },
    async caricaFoto(eventoID) {
      console.log("Caricamento foto...");
    },
  },
}
</script>


<style>
.myflex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>