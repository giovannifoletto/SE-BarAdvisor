
<template>
  <div class="container pt-2">

    <Errors :error="error" />

    <form @submit.prevent="registrazioneGestoreLocale">
      <div class="form-group mb-1">
        <label for="nome">Nome Utente</label>

        <input
          v-model="gestoreLocale.nome"
          type="text"
          class="form-control"
          id="nome"
          placeholder="Nome Utente"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="email">Email</label>
        <input
          v-model="gestoreLocale.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group mb-1">
        <label for="password1">Password</label>
        <input
          v-model="gestoreLocale.password"
          type="password"
          class="form-control"
          id="password1"
          placeholder="Password"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="password2">Conferma Password</label>
        <input
          v-model="gestoreLocale.confermaPassword"
          type="password"
          class="form-control"
          id="password2"
          placeholder="Password"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="nomeLocale">Nome Locale</label>
        <input
          v-model="gestoreLocale.nomeLocale"
          type="text"
          class="form-control"
          id="nomeLocale"
          placeholder="Nome Locale"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="posizione">Posizione</label>
        <input
          v-model="gestoreLocale.posizione"
          type="text"
          class="form-control"
          id="posizione"
          placeholder="Positione"
          required
        />
      </div>
      <div class="myflex">
        <div>
          <div class="py-1"></div>

          <Primary type="submit" title="Registrati" />
        </div>
        <router-link :to="{ name: 'registrazione' }">
          <Secondary title="Torna indietro" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import Errors from "@/components/Errors.vue";

import config from "@/config";

export default {
  name: "RegistrazionView",
  components: {
    Secondary,
    Primary,
    Errors
  },
  data() {
    return {
      gestoreLocale: {
        nome: "",
        email: "",
        password: "",
        nomeLocale: "",
        posizione: "",
      },
      confermaPassword: "",
      error: {
        status: "",
        messagggio: "Messaggio di Errore"
      }
    };
  },
  methods: {
    async registrazioneGestoreLocale() {
      const opzioniRichiesta = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.gestoreLocale),
      };

      try {
        const res = await fetch(
          `${config.baseURL}/auth/new/gestorelocale`,
          opzioniRichiesta
        );
        const data = await res.json();

        if (data.success) this.$router.push("/login");
        else {
          console.log(data.error || data.message);
          this.error.status = true;
          this.error.messaggio =
            data.error || data.message || "Errore inaspettato, riprovare";
        }
      } catch (error) {
        console.log(error);
        this.error.status = true;
        this.error.messaggio =
          data.error || data.message || "Errore inaspettato, riprovare";
      }
    },
  },
};
</script>

<style>
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
</style>
