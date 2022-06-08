<template>
  <main>
    <h1 class="text-center" style="color: var(--primary)">Verifica Locali</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome Locale</th>
          <th scope="col">Azione</th>
        </tr>
      </thead>
      <tbody v-if="locali.lenght > 0">
        <tr v-for="locale in locali" :key="locale._id">
          <th scope="row">{{ locale._id }}</th>
          <td>{{ locale.nome }}</td>
          <td> <Primary title="Verifica" @buttonClicked="verificaLocale(locale._id)" /> </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import config from '@/config'

import Primary from '@/components/buttons/Primary'

export default {
  components: {
    Primary
  },
  data() {
    return {
      locali: []
    }
  },
  methods: {
    async verificaLocale(localeID) {
      const opzioniRichiesta = {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.$store.state.token}` },
      body: JSON.stringify({ localeID })
    }

    try {
      const res = await fetch(`${config.baseURL}/locali/${localeID}/verifica`, opzioniRichiesta)
      const data = await res.json()

      if (data.success)
        this.$router.go()
      else
        console.log(data.error)
    } catch (error) {
      console.log(error)
    }
    }
  },
  async mounted() {
    const opzioniRichiesta = {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.$store.state.token}` }
    }

    try {
      const res = await fetch(`${config.baseURL}/locali`, opzioniRichiesta)
      const data = await res.json()

      if (data.success) {
        this.locali = data.locali
      }
      else {
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>