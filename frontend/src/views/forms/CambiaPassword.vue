
<template>
  <div class="container pt-2">
        <Errors :error="error" />
    <form class="container" @submit.prevent="cambiaPassword">
      <div class="form-group mb-1">
        <label for="nome">Vecchia Password</label>
        <input
          v-model="form.oldPassword"
          type="password"
          class="form-control"
          id="vecchiaPassword"
          placeholder="Inserisci Vecchia password"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="nome">Nuova Password</label>
        <input
          v-model="form.newPassword"
          type="password"
          class="form-control"
          id="password1"
          placeholder="Inserisci Nuova password"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="nome">Conferma Nuova Password</label>
        <input
          v-model="confermaPassword"
          type="password"
          class="form-control"
          id="password2"
          placeholder="Conferma nuova password"
          required
        />
      </div>
      <div class="myflex">
        <div>
          <div class="py-1"></div>
          <Primary type="submit"
            title="Cambia password"
          />
        </div>
        <router-link :to="{name: 'profiloPersonale'}">
          <Secondary title="Annulla" />
        </router-link>
      </div>
    </form>
  </div>
</template>


<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Errors from "../../components/Errors.vue";

import config from "@/config";

export default {
  name: "RegistrazionView",
  components: {
    Secondary,
    Primary,
    Errors,
},
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
      },
      confermaPassword: '',
      error: {
          status: false,
          messaggio: "Messaggio di default"
      }
    }
  },
  methods: {
    async cambiaPassword() {

        if(this.confermaPassword !== this.form.newPassword){
            this.error.status = true
            this.error.messaggio = "La nuove password devono coincidere."
            return
        }

      const opzioniRichiesta = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.$store.state.token}` },
        body: JSON.stringify(this.form)
      }

      try {
        const res = await fetch(`${config.baseURL}/auth/cambiopassword`, opzioniRichiesta)
        const data = await res.json()

        if (data.success){
            this.$store.commit('resetToken')
            this.$router.push('/login')
        } else{
            this.error.status = true
            this.error.messaggio = data.error || data.message || "Errore inaspettato, riprovare"
            console.log(data.error || data.message)
        }

      } catch (error) {
        console.log(error)
        this.error.status = true
        this.error.messaggio = error || "Problema inaspettato, riprovare."
      }
    }
  }
};
</script>


<style scoped>
form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 10px;
  margin-bottom: 25px;
}
.myflex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
}
</style>