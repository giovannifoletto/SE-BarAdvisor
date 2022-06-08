<template>
  <form>
    <div class="input-group">
      <div class="custom-file">
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
      <div class="input-group-append">
        <div class="input-group-append">
          <Primary title="Carica Foto" @buttonClicked="caricaImmagine" v-if="standAlone"/>
          <Secondary title="Annulla" @buttonClicked="annullaCaricamento" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import config from "@/config";
import axios from "axios";

export default {
  components: {
    Primary,
    Secondary,
  },
  props: ["eventoID", "standAlone", "caricaImmagine"],
  data() {
    return {
      immagine: null,
      copertina: null,
      copertinaCaricata: false,
      preview: null,
    };
  },
  methods: {
    fileSelezionato(event) {
      this.immagine = event.target.files[0];
      this.preview = URL.createObjectURL(this.immagine);
    },
    annullaCaricamento() {
      this.preview = null;
      document.getElementById("1").value = "";
    },
    async caricaImmagine() {
      if (!this.immagine) {
        this.error.status = true;
        this.error.messaggio = "Selezionare almeno 1 file";
        return;
      }
      const fd = new FormData();
      fd.append("immagine", this.immagine);

      try {
        const res = await axios.post(
          `${config.baseURL}/eventi/${this.eventoID}/copertina`,
          fd
        );

        if (!res.data.success) {
          this.error.status = true;
          this.error.messaggio = res.data?.error || res.data?.message;
        } else {
          this.preview = null;
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.image {
  width: 70px;
  height: 70px;
}
</style>