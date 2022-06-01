<template>
  <div>
    <h1>bacheca</h1>
    <h2 v-if="$store.state.token">benvenuto {{$store.state.email}}</h2>
    <div v-for="evento in eventi" :key="evento._id">
      <div>
        <h2>{{ evento?.nome }}</h2>
        <h3>{{ evento?.locale?.nome }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      eventi: []
    }
  },
  async mounted() {
    try {
      const res = await fetch('http://localhost:4000/api/v1/eventi')
      const data = await res.json()

      if (data.success) {
        this.eventi = data.eventi
      }

    } catch (error) {
      console.log(error)
    }
  }
}
</script>
