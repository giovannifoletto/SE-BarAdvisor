<script>
import ErrorDiv from "../../components/ErrorDiv.vue";
export default {
  data() {
    return {
      user: {
        nomeUtente: null,
        email: null,
        password: null,
        nomeLocale: null,
        posizione: null,
      },
      error: {
        status: false,
        errorText: null,
      },
      password2: null,
    };
  },
  methods: {
    async handleRegistrazione() {
      if (
        !this.user.nomeUtente ||
        !this.user.email ||
        !this.user.password ||
        !this.user.nomeLocale ||
        !this.user.posizione
      ) {
        this.error.status = true;
        this.error.errorText = "Tutti i campi sono necessari per continuare.";
        return;
      }

      if (this.user.password != this.password2) {
        this.error.status = true;
        this.error.errorText = "Le password non corrispondono, riprovare.";
        return;
      }

      try {
        const fet = await this.$axios({
          url: "auth/new/gestorelocale",
          method: "post",
          data: user,
        });
        // to check
        if (fet.success) {
          window.location.href = "/login";
        }
      } catch (err) {
        this.error.status = true;
        this.error.error = `Errore`;

        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div class="container pt-2">
    <ErrorDiv
      :errorText="error.errorText"
      v-if="error.status"
      @dismissError="error.status = !error.status"
    />
    <form>
      <div class="form-group mb-1">
        <label for="nomeUtente">Nome Utente</label>

        <input
          type="text"
          class="form-control"
          id="nomeUtente"
          placeholder="Nome Utente"
          v-model="user.nomeUtente"
        />
      </div>
      <div class="form-group mb-1">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          v-model="user.email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group mb-1">
        <label for="password1">Password</label>
        <input
          type="password"
          class="form-control"
          id="password1"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div class="form-group mb-1">
        <label for="password2">Conferma Password</label>
        <input
          type="password"
          class="form-control"
          id="password2"
          placeholder="Password"
          v-model="password2"
        />
      </div>
      <div class="form-group mb-1">
        <label for="nomeLocale">Nome Locale</label>
        <input
          type="text"
          class="form-control"
          id="nomeLocale"
          placeholder="Nome Locale"
          v-model="user.nomeLocale"
        />
      </div>
      <div class="form-group mb-1">
        <label for="posizione">Posizione</label>
        <input
          type="text"
          class="form-control"
          id="posizione"
          placeholder="Positione"
          v-model="user.posizione"
        />
      </div>
      <div class="myflex">
        <div>
          <ButtonsPrimary
            title="Registrati"
            @buttonClicked="handleRegistrazione()"
          />
        </div>
        <NuxtLink to="/signup">
          <ButtonsSecondary title="Torna indietro" />
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

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
