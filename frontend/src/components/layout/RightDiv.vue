<template>
  <div>
    <h1 v-if="$store.state.token">
      Ciao,
      {{
        $store.state.user.nome.slice(0, 1).toUpperCase() +
        $store.state.user.nome.slice(1, 1000)
      }}
    </h1>
    <h1 v-if="!$store.state.token">
      Esegui il Login per utilizzare al meglio la piattaforma.
    </h1>
  </div>
</template>

<script>
export default {
  name: "Right Div",
};
</script>

<style scoped>
div {
  text-align: center;
}
</style>