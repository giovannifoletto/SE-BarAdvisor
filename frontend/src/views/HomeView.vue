<template>
  <div>
    <Errors :error="error"/>

    <PostEvento
      v-for="evento in eventi"
      :key="evento._id"
      :evento="evento"
      :locale="evento.locale"
    />
  </div>
</template>

<script>
import PostEvento from "@/components/PostEvento";
import Errors from '@/components/Errors';
import config from "@/config";

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
      const res = await fetch(`${config.baseURL}/eventi`);
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
