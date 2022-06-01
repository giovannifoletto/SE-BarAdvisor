<script>
export default {
  name: 'Left Div'
};
</script>

<template>
  <div>
    <h1>{{ $store.state.user.name }}</h1>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>