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
        <Ranking :ranking="recensione.votazione" />
        <div v-if="$store.state.token && String(recensione.utente) === $store.state.user.id">
          <Secondary title="elimina" @buttonClicked="cancellaRecensione" />
        </div>
      </div>
      <hr />
      <div class="commento">
        <h6>{{ recensione.commento }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account";
import Ranking from "./Ranking.vue";
import Primary from "@/components/buttons/Primary"
import Secondary from "@/components/buttons/Secondary"

import config from "../config";

export default {
  name: "Commento",
  props: ["recensione"],
  data() {
    return {
      nomeUtente: "",
      messaggio: {
        status: false,
        messaggio: ""
      },
      error: {
        status: false,
        messaggio: ""
      }
    };
  },
  components: {
    Account,
    Ranking,
    Primary,
    Secondary
  },
  methods: {
    async cancellaRecensione() {
      const opzioniRichiesta = {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      }

      try {
        const res = await fetch(`${config.baseURL}/locali/${this.recensione.locale}/recensioni/${this.recensione._id}`, opzioniRichiesta)
        const data = await res.json()

        if (data.success) {
          this.messaggio.status = true
          this.messaggio.messaggio = "Recensione cancellata correttamente"

          this.$router.go()
          this.$emit('messaggio', this.messaggio)
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
        `${config.baseURL}/auth/utenti/${this.recensione.utente}`
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