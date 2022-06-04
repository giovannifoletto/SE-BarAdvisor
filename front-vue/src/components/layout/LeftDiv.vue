<template>
  <div>
    <h1 v-if="$store.state.token">Ciao, {{ username }}</h1>
    <h1 v-if="!$store.state.token"> Esegui il Login per utilizzare al meglio la piattaforma. </h1>
  </div>
</template>

<script>
import config from '@/config';
export default {
  name: 'Left Div',
  data(){
    return {
      username: "",
    }
  },
  async mounted(){
    const opzioniRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify(this.recensione),
      };

    try {
      const fet = await fetch(`${baseURL}/auth/utenti/${this.$store.state.user.id}`, opzioniRichiesta )

      const data = await fet.json();

      if(data.success){
        this.username = data.nomeUtente
      } else {
        this.username = ""
      }


    } catch (error) {
      
    }
  }
};
</script>

<style scoped>
div {
  text-align: center;
}
</style>