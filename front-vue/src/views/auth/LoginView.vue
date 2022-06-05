<template>
  <main>
    <Errors :error="error" />

    <form @submit.prevent="login">
      <div class="form-group">
        <label for="emailInput">Indirizzo Email</label>
        <input v-model="utente.email" type="email" class="form-control" placeholder="Inserisci email" required />
      </div>
      <br />
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input v-model="utente.password" type="password" class="form-control" placeholder="Inserisci Password"
          required />
      </div>     
      <div class="form-group myflex">
        <div class="form-check checkbox">
          <input
            class="form-check-input"
            type="checkbox"
            id="remainLoggedIn"
            v-model="restaLoggato"
          />
          <div>
            <label class="form-check-label" for="remainLoggedIn">
              Resta collegato
            </label>
          </div>
        </div>
      </div>
      <div class="myflex">
        <router-link :to="{ name: 'passwordDimenticata' }">
          <Secondary title="Dimenticato la password" />
        </router-link>
        <router-link :to="{ name: 'registrazione' }">
          <Secondary title="Crea Nuovo Account" />
        </router-link>
        <div>
          <div class="py-1"></div>
          <Primary title="Login" type="submit" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Errors from '@/components/Errors.vue'

import config from "@/config";

export default {
  name: "LoginView",
  components: {
    Primary,
    Secondary,
    Errors
  },
  data() {
    return {
      utente: {
        email: "",
        password: "",
      },
      error: {
        status: false,
        messaggio: "Messaggio di default.",
      },
      restaLoggato: false,
    }
  },
  methods: {
    async login() {
      const opzioniRichiesta = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.utente)
      }

      try {
        const res = await fetch(`${config.baseURL}/auth/login`, opzioniRichiesta)
        const data = await res.json()

        if (data.success) {

          const user = JSON.parse(atob(data.token.split('.')[1]))
          
          this.$store.commit('setLogin', { token: data.token, user: user, restaLoggato: this.restaLoggato})
          this.$router.push('/')
        }
        else {
          this.error.status = true;
        	this.error.messaggio = data?.error || data?.message || "Errore inaspettato";
        }

      } catch (error) {
        this.error.status = true;
        this.error.messaggio = error || "Errore del server, riprovare.";
      }
    },
  },
};
</script>

<style scoped>
main {
  min-height: 60vh;
  padding: 15px;
}

form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 10px;
}

.myflex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
}

.checkbox {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;
}
</style>