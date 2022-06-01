<template>
  <div>
    <h1>bacheca</h1>
    <h2 v-if="$store.state.token">benvenuto {{$store.state.email}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>
