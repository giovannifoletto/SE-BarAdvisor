<template>
  <div class="myflex">

    <router-link :to="{name: 'registrazioneCliente'}">
      <Primary title="Registrati come Cliente"/>
    </router-link>
    <router-link :to="{name: 'registrazioneGestoreLocale'}">
      <Primary title="Registrati come gestore di locale"/>
    </router-link>
    <router-link :to="{name: 'login'}">
      <Secondary title="Torna indietro"/>
    </router-link>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";

export default {
  name: "RegistrazionView",
  components: {
    Secondary,
    Primary,
  },
};
</script>

<style scoped>
.myflex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 25px;
}
</style>