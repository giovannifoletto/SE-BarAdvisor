<template>
  <div class="event">
    <div class="title">
      <div>
        <h3>{{ locale.nome }}</h3>
      </div>
    </div>
    <div class="info py-3 text-center">
      <h5>{{ locale.informazioni }}</h5>
      <h5>{{ locale.descrizione }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: null,
    };
  },
  middleware: "auth",
  async fetch() {
    // this.locale = this.$axios.get(`/eventi/${this.$route.params}`)
    this.locale = {
      nome: "Nome locale",
      locale: "idLocale",
      informazioni: "informazione",
      descrizione: "Descrizione",
    };
  },
};
</script>


<style>
.title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  justify-items: baseline;
  padding: 10px;
  border-bottom: 1px solid black;
}
</style>