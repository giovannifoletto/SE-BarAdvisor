<script>
export default {
  data() {
    return {
      baEvents: [
        {
          _id: 1,
          dataInizio: "ieri",
          descrizioneEvento: "Questo è un ottimo evento",
          nome: "Nome di questo locale",
        },
      ],
    };
  },
  mounted() {
    try {
      const baEvents = this.$axios({
        method: "get",
        url: "/eventi",
      });

      if (baEvents.success) this.baEvents = [...baEvents.data];
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <div v-for="{ e } in baEvents" :key=e._id>
      <EventPost
        :dataInizio="e.dataInizio"
        :descrizione="e.descrizioneEvento"
        :nome="e.nomeLocale"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style scoped>
main {
  text-align: center;
}
</style>