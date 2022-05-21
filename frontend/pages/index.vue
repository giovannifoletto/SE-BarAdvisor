<script>
import EventPost from "../components/EventPost.vue";
export default {
    name: "IndexPage",
    data() {
        return {
            baEvents: [
                {
                    id: 1,
                    dataInizio: "Ieri",
                    descrizione: "descrizione",
                    nome: "Nome di questo evento",
                },
            ],
        };
    },
    async fetch() {
        this.posts = await this.$axios.$get("/eventi");
    },
    fetchOnServer: false,
    fetchKey: "index-events",
    components: { EventPost }
};
</script>

<template>
  <main>
    <div
      class="d-flex justify-content-center mt-5 pt-5"
      v-if="$fetchState.pending"
    >
      <div
        class="spinner-border"
        role="status"
        style="color: var(--primary); width: 4rem; height: 4rem"
      />
    </div>
    <div v-else-if="$fetchState.error">
      <h1>Errore</h1>
    </div>
    <EventPost
      v-else
      v-for="e in baEvents"
      :key="e.id"
      :dataInizio="e.dataInizio"
      :descrizione="e.descrizione"
      :nome="e.nome"
    />
  </main>
</template>

<style scoped>
main {
  text-align: center;
}
</style>