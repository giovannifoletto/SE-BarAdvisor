<script>
import EventPost from "../components/EventPost.vue";
import ErrorDiv from "../components/ErrorDiv.vue";
export default {
    name: "IndexPage",
    data() {
        return {
            baEvents: [
                {
                    _id: 1,
                    dataInizio: "Ieri",
                    descrizione: "descrizione",
                    nome: "Nome di questo evento",
                },
            ],
            error: {
              status: false,
              errorText: "Avvenuto un errore imprevisto, riprovare più tardi."
            }
        };
    },
    async fetch() {
        this.baEvents = await this.$axios.$get("/eventi");
    },
    fetchOnServer: false,
    fetchKey: "index-events",
    components: { EventPost, ErrorDiv }
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
    <div v-else-if="$fetchState.error" class="pt-3">
      <ErrorDiv :errorText="error.errorText" />
    </div>
    <EventPost
      v-else
      v-for="e in baEvents"
      :key="e._id"
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