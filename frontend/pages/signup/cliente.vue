<script>
import ErrorDiv from "../../components/ErrorDiv.vue";
/**
 * Pagina SignUp utente tipo Cliente
 */
export default {
  data() {
    return {
      user: {
        nomeUtente: null,
        email: null,
        password: null,
      },
      error: {
        errorText: null,
        status: false,
      },
      password2: null,
    };
  },
  methods: {
    async handleRegistrazione() {
      if (!this.user.nomeUtente || !this.user.email || !this.user.password) {
        this.error.status = true;
        this.error.errorText = "Tutti i campi sono necessari per continuare.";
        return;
      }

      if (this.user.password != this.password2) {
        error.status = true;
        error.text = "Le password non corrispondono, riprovare.";
        return;
      }

      try {
        const user = this.$axios({
          url: "/auth/new/cliente",
          method: "post",
          data: this.user,
        });

        if (user.success) {
          window.location.href = "/login";
        } else {
          this.error.status = true;
          this.error.errorText = "Errore durante la comunicazione con il server, riprovare.";
          return;
        }
      } catch (err) {
        console.log(err);
        this.error.status = true;
        this.error.errorText = err;
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

    <form class="container">
      <div class="form-group mb-1">
        <label for="nomeUtente">Nome utente</label>
        <input
          type="text"
          class="form-control"
          id="nomeUtente"
          placeholder="Inserisci Email"
          v-model="user.nomeUtente"
          required
        />
      </div>
      <div class="form-group mb-1">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter email"
          v-model="user.email"
          required
        />
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
      <div class="myflex">
        <div>
          <ButtonsPrimary
            title="Registrati"
            @buttonClicked="
              {
                handleRegistrazione();
              }
            "
          />
        </div>
        <NuxtLink to="/signup">
          <ButtonsSecondary title="Torna indietro" />
        </NuxtLink>
      </div>
    </form>
  </div>
</template>


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