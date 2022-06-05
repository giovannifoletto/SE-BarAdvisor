<template>
  <main>
    <Errors :error="error"/>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="inputPassword">Inserisci nuova password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Inserisci Password"
          v-model="password"
          required
        />
      </div>
      <br />
      <div class="form-group pt-2">
        <label for="inputPassword">Conferma nuova password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Conferma Password"
          v-model="confermaPassword"
          required
        />
      </div>
      <div class="myflex">
        <div>
          <div class="py-1"></div>
          <Primary title="Conferma" type="submit"/>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Errors from "@/components/Errors.vue";

import config from "@/config";

export default {
  name: "resetPassword",
  props: ["passwordToken"],
  components: {
    Primary,
    Secondary,
    Errors
  },
  data() {
    return {
      password: "",
      confermaPassword: "",
      error: {
        status: false,
        messaggio: "Errore generico del server"
      }
    };
  },
  methods: {
    async resetPassword() {
      const opzioneRichiesta = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: this.password })
      }

      try {
        const res = await fetch(`${config.baseURL}/auth/resetpassword/${this.passwordToken}`, opzioneRichiesta)
        const data = await res.json()  
        
        if (data.success){
          this.$router.push({ name: 'login' })
        } else {
          this.error.status = true
          this.error.messaggio = data.error || data.message || "Errore inaspettato, riprovare"
        }
          
      } catch (error) {
        console.log(error)
        this.error.status = true
        this.error.messaggio = error || "Errore inaspettato, riprovare"
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