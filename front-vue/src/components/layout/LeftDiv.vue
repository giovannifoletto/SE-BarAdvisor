<script>
export default {
  name: 'Left Div',
};
</script>

<template>
  <div>
    <h1 v-if="$store.state.token">{{ $store.state.user.email }}</h1>
    <h1 v-if="!$store.state.token"> Account </h1>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>