<template>
  <div class="post my-1">
    <div class="title pt-2">
      <div class="account">
        <div>
          <Account />
        </div>
        <router-link
          :to="{ name: 'paginaEvento', params: { eventoID: id } }"
          class="px-3"
        >
          <h3>{{ nome[0].toUpperCase() + nome.slice(1, 1000) }}</h3>
        </router-link>
      </div>
    </div>
    <div class="under">

      <!-- Sezione immagine -->
      <div class="img-section">
        <h1>Image</h1>
      </div>
      
      <!-- Sezione del testo laterale -->
      <div class="info p-1">

        <div class="important-info">

          <div class="locale">
            <h6>Locale</h6>
            <router-link
              :to="{ name: 'paginaLocale', params: { localeID: localeID } }"
            >
              <h4>{{ locale[0].toUpperCase() + locale.slice(1, 1000) }}</h4>
            </router-link>
          </div>

          <div class="data-inizio">
            <h6>Data di inizio</h6>
            <h4>
              {{ new Date(dataInizio).getDate() }}
              {{ months[new Date(dataInizio).getMonth()] }}
              {{ new Date(dataInizio).getFullYear() }}
            </h4>
            <h4>
              ore: {{ new Date(dataInizio).toLocaleTimeString() }}
            </h4>
          </div>

        </div>

        <h6>informazioni</h6>
        <h5>{{ descrizione }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account";

export default {
  props: ["id", "nome", "localeID", "locale", "descrizione", "dataInizio"],
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
    };
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
  display: flex;
  flex-flow: row wrap;
}
.img-section {
  width: 40%;
  text-align: center;
}
.important-info{
  display: flex;
  flex-flow: row;
  gap: 50px;
}
</style>