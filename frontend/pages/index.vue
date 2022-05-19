<template>
  <main>
    <h1>Home Page</h1>

    <EventPost
      dataInizio="Data di inizio"
      descrizione="Descrizione dell'evento"
      nome="Nome dell'evento"
      
    />
  </main>
</template>

<script>
import EventPost from "../components/EventPost.vue";
export default {
  name: "IndexPage",
  components: { EventPost },
};
</script>

<style scoped>
main {
  text-align: center;
}
</style>