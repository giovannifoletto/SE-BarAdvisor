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
      <tbody>
        <tr v-for="locale in locali" :key="locale._id">
          <th scope="row">{{locale._id}}</th>
          <td>{{ locale.nome }}</td>
          <td>{{ locale.InstanceTypestatus }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
    components: {

    },
    data(){
        return {
            locali: []
        }
    },
    mounted(){
        this.locali = [
            {
                _id: 1,
                nome: "Scaletta",
                status: "Not Verified"
            }
        ]
    }
}
</script>