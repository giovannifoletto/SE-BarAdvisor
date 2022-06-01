<template>
  <div>
    <h1>bacheca</h1>
    <PostEvento
      v-for="evento in eventi"
      :key="evento._id"
      :nome="evento.nome"
      :locale="evento.locale"
      :descrizione="evento.descrizione"
      :dataInizio="evento.dataInizio"
    />
  </div>
</template>

<script>
import PostEvento from "@/components/PostEvento";
export default {
  name: "HomeView",
  components: {
    PostEvento,
    EventoView,
  },
  data() {
    return {
      eventi: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/eventi");
      const data = await res.json();

      if (data.success) {
        this.eventi = data.eventi;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
