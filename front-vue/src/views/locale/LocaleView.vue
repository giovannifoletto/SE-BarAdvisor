<template>
  <div class="post" v-if="locale">
    <div class="title">
      <div class="first-title">
        <div class="title-account">
          <Account />
        </div>
        <h3>{{ locale.nome }}</h3>
        <div class="ranking">
          <Ranking :ranking="locale.ranking" />
        </div>
      </div>

      <div class="bio-title">
        <h4>Descrizione Locale</h4>
        <h5>{{ locale.descrizione }}</h5>
      </div>
    </div>

    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Prossimi Eventi</h3>
      </div>
      <div>
        <div class="comm-row">
          <CardEvento
            v-for="evento in prossimiEventi"
            :key="evento._id"
            :evento="evento"
          />
        </div>
      </div>
    </div>

    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Eventi Passati</h3>
      </div>
      <div>
        <div class="comm-row">
          <CardEvento
            v-for="evento in eventiPassati"
            :key="evento._id"
            :evento=evento
          />
        </div>
      </div>
    </div>

    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Recensioni</h3>
      </div>
      <div class="comm">
        <div class="comm-row">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardEvento from "@/components/CardEvento.vue"
import Ranking from '@/components/Ranking'
import Account from '@/components/icons/Account'

export default {
  name: "paginaLocale",
  props: ["localeID"],
  components: {
    CardEvento, Ranking, Account
  },
  data() {
    return {
      locale: null,
      prossimiEventi: null,
      eventiPassati: null,
    };
  },
  async mounted() {
    const res = await fetch(
      "http://localhost:4000/api/v1/locali/" + this.localeID
    );
    const data = await res.json();

    if (data.success) {
      this.locale = data.locale
      this.prossimiEventi = data.prossimiEventi
      this.eventiPassati = data.eventiPassati
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
