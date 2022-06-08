<template>
  <div>
    <Message :messaggio="messaggio"/>

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
import Message from '@/components/Message';

import config from "@/config";

export default {
  name: "HomeView",
  components: {
    PostEvento, Errors, Message
  },
  data(){
    return {
      eventi: [],
      error: {},
      messaggio: {}
    }
  },
  async mounted() {
    try {
      const res = await fetch(`${config.baseURL}/eventi`);
      const data = await res.json();

      if (data.success) {
        this.eventi = data.eventi;
        if(this.eventi.length == 0){
          this.messaggio = { status: true, messaggio: "Non ci sono ancora eventi in programma" }
        }
      } else {
        this.error.status = true;
        this.error.messaggio = data.message || "Errore imprevisto";
      }
    } catch (error) {
      this.error.status = true;
      this.error.messaggio = error || "Errore imprevisto";
    }
  },
};
</script>
