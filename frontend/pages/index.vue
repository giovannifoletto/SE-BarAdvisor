<script>
import EventPost from "../components/EventPost.vue";
import ErrorDiv from "../components/ErrorDiv.vue";
import Loader from "../components/Loader.vue";
export default {
    name: "IndexPage",
    data() {
        return {
            baEvents: [],
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
    components: { EventPost, ErrorDiv, Loader },

};
</script>

<template>
  <main>
    <Loader v-if="$fetchState.pending" dim="8"/>
    <div v-else-if="$fetchState.error" class="pt-3">
      <ErrorDiv
      :errorText="error.errorText"
      @dismissError="error.errorText = 'Errore non eliminabile, riprovare.'"
    />
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