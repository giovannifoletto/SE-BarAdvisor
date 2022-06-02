<template>
  <div class="post" v-if="locale">
    <div class="title">
      <div class="first-title">
        <div class="title-account">
          <AccountIcon />
        </div>
        <h3>{{ locale.nome }}</h3>
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
            :nomeEvento="evento.nome"
            :dataEvento="evento.dataInizio"
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
            :nomeEvento="evento.nome"
            dataEvento=""
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
          <Ranking :ranking="locale.ranking" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardEvento from "@/components/CardEvento.vue"
import Ranking from '@/components/Ranking'

export default {
  name: "paginaLocale",
  props: ["localeID"],
  components: {
    CardEvento, Ranking
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

    console.log(data);
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
