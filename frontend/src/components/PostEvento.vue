<template>
  <div class="post my-1">
    <div class="title pt-2">
      <div class="account">
        <div>
          <Account />
        </div>
        <router-link
          :to="{ name: 'paginaEvento', params: { eventoID: evento._id } }"
          class="px-3"
        >
          <h3>
            {{ evento.nome[0].toUpperCase() + evento.nome.slice(1, 1000) }}
          </h3>
        </router-link>
      </div>
    </div>
    <div class="under">
      <!-- Sezione immagine -->
      <div class="img-section" v-if="copertinaCaricata">
        <img :src="copertina" class="image" />
      </div>

      <!-- Sezione del testo laterale -->
      <div class="info p-1">
        <div class="important-info">
          <div class="locale">
            <h6>Locale</h6>
            <router-link
              :to="{ name: 'paginaLocale', params: { localeID: locale._id } }"
            >
              <h4>
                {{ locale.nome[0].toUpperCase() + locale.nome.slice(1, 1000) }}
              </h4>
            </router-link>
          </div>

          <div class="data-inizio">
            <h6>Data di inizio</h6>
            <h4>
              {{ new Date(evento.dataInizio).getDate() }}
              {{ months[new Date(evento.dataInizio).getMonth()] }}
              {{ new Date(evento.dataInizio).getFullYear() }}
            </h4>
            <h4>
              ore:
              {{
                new Date(evento.dataInizio).toLocaleTimeString().split(":")[0] +
                ":" +
                new Date(evento.dataInizio).toLocaleTimeString().split(":")[1]
              }}
            </h4>
          </div>
        </div>

        <h6>informazioni</h6>
        <h5>{{ evento.descrizione }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account";
import axios from "axios";

import config from "@/config";

export default {
  props: ["evento", "locale"],
  components: {
    Account,
  },
  data() {
    return {
      months: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ],
      copertina: null,
      copertinaCaricata: false,
    };
  },
  async mounted() {
    try {
      if (this.evento.copertina) {
        // get immagine dell'evento
        const response = await axios.get(
          `${config.baseURL}/eventi/${this.evento._id}/copertina`
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
      this.$emit("error", error)
      console.log(error);
    }
  },
};
</script>

<style scoped>
.post {
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid black;
  border-radius: 4px;
  justify-content: baseline;
}
.title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid black;
  background-color: var(--secondaryOrange);
}
.account {
  display: flex;
  flex-flow: row nowrap;
  justify-content: baseline;
  padding-left: 5px;
  display: flex;
  column-gap: 10px;
}
.under {
  display: grid;
  grid-template-columns: 50% 50%;
}
.important-info {
  display: flex;
  flex-flow: row;
  gap: 50px;
  text-align: center;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  padding: 10px;
}
</style>