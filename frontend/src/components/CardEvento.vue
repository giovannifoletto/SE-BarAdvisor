<template>
  <div class="comment my-2" v-if="caricato">
    <div class="left">
      <account />
    </div>
    <div class="right py-2">
      <div class="title-event">
        <h5 class="pb-0 pt-0 px-2">{{ evento.nome[0].toUpperCase() + evento.nome.slice(1, 1000) }}</h5>
        <h6 v-if="evento.dataInizio < (new Date().now)" class="pb-0 pt-0 px-2">Data: {{ evento.dataInizio }}</h6>
      </div>

      <div class="column">
        <div class="unfollow">
          <div>
            <router-link :to="{ name: 'paginaEvento', params: { eventoID: evento._id } }">
              <Secondary title="Visualizza" />
            </router-link>
          </div>
          <div v-if="!eventoScaduto">
            <Primary title="Prenotati" v-if="$store.state.token && !utentePrenotato" @click="postPrenotazione"/>
            <Secondary title="Disiscriviti" v-if="$store.state.token && utentePrenotato" @click="deletePrenotazione"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account.vue"
import Primary from "@/components/buttons/Primary.vue";
import Secondary from '@/components/buttons/Secondary'
import Errors from '@/components/Errors'
import config from '@/config'
import postPrenotazione from "@/lib/postPrenotazione";
import deletePrenotazione from "@/lib/deletePrenotazione";

export default {
  components: { Account, Secondary, Primary, Errors },
  props: ["evento"],
  data() {
    return {
      caricato: false,
      utentePrenotato: false,
      eventoScaduto: false,
      error: {
        status: false,
        messaggio: ""
      }
    }
  },
  methods: {
    async postPrenotazione() {
      const { data, error } = await postPrenotazione(this.evento._id)
      this.$emit("error", error)

      if(data.success)
        this.utentePrenotato = true
    },
    async deletePrenotazione() {
      const {data, error} = await deletePrenotazione(this.evento._id)
      this.$emit("error", error)

      if(data.success)
        this.utentePrenotato = false
    }
  },
  async mounted() {
    try {
      const res = await fetch(`${config.baseURL}/eventi/${this.evento._id}`)
      const data = await res.json()

      if (data.success) {
        if (Date.parse(this.evento.dataInizio) < Date.now())
          this.eventoScaduto = true
        data.evento.prenotazioni.forEach(usr => {
          if (usr._id === this.$store.state?.user?.id) this.utentePrenotato = true
        })
      }
      this.caricato = true
    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<style scoped>
.comment {
  display: flex;
  flex-flow: row nowrap;
  row-gap: 10px;
  border: 1px solid black;
  border-radius: 4px;
}

.left {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

.right {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  text-align: start;
  column-gap: 1px;
  padding-right: 0.7rem;
  width: 100%;
}

hr {
  padding: 0;
  margin: 0.3rem;
}

.title-event {
  display: flex;
  flex-flow: column nowrap;
}

.unfollow {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  text-align: center;
  gap: 20px;
}

.column {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
}
</style>