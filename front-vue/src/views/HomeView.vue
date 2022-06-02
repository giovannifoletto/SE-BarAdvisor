<template>
  <div>
    <Errors :error="error"/>

    <PostEvento
      v-for="evento in eventi"
      :key="evento._id"
      :id="evento._id"
      :nome="evento.nome"
      :locale="evento.locale"
      :descrizione="evento.descrizione"
      :dataInizio="evento.dataInizio"
    />
  </div>
</template>

<script>
import PostEvento from "@/components/PostEvento";
import Errors from '@/components/Errors'

export default {
  name: "HomeView",
  components: {
    PostEvento, Errors
  },
  data(){
    return {
      eventi: [],
      error: {}
    }
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/eventi");
      const data = await res.json();

      if (data.success) {
        this.eventi = data.eventi;
        if(this.eventi.length == 0){
          this.error.status = true
          this.error.text = "Non sono presenti ancora eventi sul database."
        }
      } else {
        this.error.status = true;
        this.error.text = data.message || "Errore imprevisto";
      }
    } catch (error) {
      this.error.status = true;
      this.error.text = error || "Errore imprevisto";
    }
  },
};
</script>
