
<template>
  <main>
    <Errors :error="error" />

    <form>
      <div v-if="!caricamentoImmagine">
        <h1 class="text-center">Crea un nuovo Evento</h1>
        <div class="form-group">
          <label for="nomeEvento">Nome Evento</label>
          <input
            v-model="evento.nome"
            type="text"
            class="form-control"
            placeholder="Inserisci nome evento"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="descrizioneEvento">Descrizione</label>
          <input
            v-model="evento.descrizione"
            type="text"
            class="form-control"
            placeholder="Inserisci breve descrizione"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="dataInizio">Data Inizio</label>
          <input
            v-model="evento.dataInizio"
            type="datetime-local"
            class="form-control"
            placeholder="Inserisci data inizio evento"
            required
          />
        </div>
      </div>

      <div class="custom-file" v-if="caricamentoImmagine" :eventoID="eventoID">
        <img
          class="image"
          :src="copertina"
          v-if="copertinaCaricata && !preview"
        />
        <img class="image" :src="preview" v-if="preview" />

        <input
          type="file"
          class="custom-file-input"
          id="1"
          @change="fileSelezionato"
          hidden
        />

        <label class="custom-file-label pl-2" for="1">Seleziona Immagine</label>
      </div>

      <div class="myflex">
        <Primary title="Conferma" @buttonClicked="postEvento" />
        <router-link
          :to="{ name: 'paginaLocale', props: { localeID: localeID } }"
        >
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
      error: {
        messaggio: null,
        status: false,
      },
      caricamentoImmagine: false,
      eventoID: null,
    };
  },
  methods: {
    async postEvento() {
      if (!this.caricamentoImmagine) {
        this.caricamentoImmagine = true;
        return;
      }

      const token = this.$store.token || localStorage.getItem("token");
      const opzioniRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.evento),
      };

      try {
        const res = await fetch(
          `${config.baseURL}/locali/${this.localeID}/eventi`,
          opzioniRichiesta
        );
        const data = await res.json();

        if (data.success) {
          await this.caricaFoto(data.eventoID);
          // this.$router.push({ name: "paginaLocale" });
        } else {
          this.error.status = true;
          this.error.messaggio =
            data?.message || data?.error || "Errore nel fetch.";
        }
      } catch (error) {
        console.log(error);
        this.error.status = true;
        this.error.messaggio = error || "Errore imprevisto.";
      }
    },
    async caricaFoto(eventoID) {
      console.log("Caricamento foto...");
    },
  },
};
</script>


<style>
.myflex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>