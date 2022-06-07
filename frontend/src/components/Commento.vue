<template>
  <div class="comment my-2">
    <div class="left">
      <Account height="{val}" width="{val}" />
    </div>
    <div class="right py-2">
      <div class="upper">
        <h5 class="pb-0">
          {{ nomeUtente }}
        </h5>
        <div v-if="$store.state.token && String(commento.utente) === $store.state.user.id">
          <Secondary title="elimina" @buttonClicked="cancellaCommento" />
        </div>
      </div>
      <hr />
      <div class="commento">
        <h6>{{ commento.commento }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account"
import Ranking from "./Ranking.vue"
import Secondary from "@/components/buttons/Secondary"

import config from "@/config";

export default {
  name: "Commento",
  props: ["commento"],
  data() {
    return {
      nomeUtente: "",
      error: {
        status: false,
        messaggio: ""
      }
    };
  },
  components: {
    Account,
    Ranking,
    Secondary
  },
  methods: {
    async cancellaCommento() {
      const opzioniRichiesta = {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      }

      try {
        const res = await fetch(`${config.baseURL}/eventi/${this.commento.evento}/commenti/${this.commento._id}`, opzioniRichiesta)
        const data = await res.json()

        if (data.success) {
          this.$router.go()
        }
        else {
          this.error.status = true
          this.error.messaggio = data?.messaggio || data?.error

          this.$emit('error', this.error)
        }
      } catch (error) {
        this.error.status = true
        this.error.messaggio = error

        this.$emit('error', this.error)
      }

    },
  },
  async mounted() {
    try {
      const res = await fetch(
        `${config.baseURL}/auth/utenti/${this.commento.utente}`
      );
      const data = await res.json();

      if (data.success) {
        this.nomeUtente = data.nomeUtente;
      } else {
        this.error.status = true
        this.error.messaggio = data?.messaggio || data?.error

        this.$emit("error", this.error);
      }
    } catch (error) {
      this.error.status = true
      this.error.messaggio = error

      this.$emit("error", this.error);
    }
  },
};
</script>

<style>
.comment {
  display: flex;
  flex-flow: row nowrap;
  row-gap: 10px;
  border: 1px solid black;
  border-radius: 4px;
  min-width: 100%;
}

.left {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

.right {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  justify-items: baseline;
  column-gap: 1px;
}

.upper {
  display: flex;
  flex-flow: row nowrap;
  justify-items: baseline;
  column-gap: 40px;
}

.beer {
  padding-right: 0.7rem;
}

.commento {
  text-align: start;
}

hr {
  padding: 0;
  margin: 0.3rem;
}
</style>