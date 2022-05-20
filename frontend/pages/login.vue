<script>
import ErrorDiv from "../components/ErrorDiv.vue";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      error: {
        errorText: null,
        status: false,
      },
      checkbox: false,
    };
  },
  methods: {
    async handleLogin(event) {
      if (!this.user.email || !this.user.password) {
        this.error.text = "Necessario inserire email e password.";
        this.error.status = true;
        return;
      }
      try {
        const user = await this.$axios({
          method: "post",
          url: "auth/login",
          data: this.user,
        });
        // console.log(user);
        if (user.success) {
          if (checkbox) {
            this.localStoreToken(user.data.token);
          } else {
            this.sessionStoreToken(user.data.token);
          }
          console.log("Success");

          window.location.href = "/";
        }
      } catch (err) {
        console.log(err);
        this.error.status = true;
        this.error.errorText = err;
      }
    },
    localStoreToken(token) {
      if (process.client) {
        localStorage.setItem("authToken", token);
      }
    },
    sessionStoreToken(token) {
      if (process.client) {
        sessionStorage.setItem("authToken", token);
      }
    },
  },
  components: { ErrorDiv },
};
</script>

<template>
  <main>
    <ErrorDiv
      :errorText=error.errorText
      v-if="error.status"
      @dismissError="error.status = !error.status"
    />

    <form>
      <div class="form-group">
        <label for="emailInput">Indirizzo Email</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control"
          placeholder="Inserisci email"
          required
        />
      </div>
      <br />
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Inserisci Password"
          required
        />
      </div>
      <div class="form-group myflex">
        <div class="form-check checkbox">
          <input
            class="form-check-input"
            type="checkbox"
            id="remainLoggedIn"
            v-model="checkbox"
          />
          <div>
            <label class="form-check-label" for="remainLoggedIn">
              Resta collegato
            </label>
          </div>
        </div>
      </div>
      <div class="myflex">
        <!--
            Adding promise loading button
        <div class="spinner-border m-5" role="status"></div>
        
        -->

        <NuxtLink to="/passwordrecovery">
          <ButtonsSecondary title="Dimenticato la password" />
        </NuxtLink>
        <NuxtLink to="/signup">
          <ButtonsSecondary title="Crea Nuovo Account" />
        </NuxtLink>
        <div>
          <ButtonsPrimary title="Login" @buttonClicked="handleLogin($event)" />
        </div>
      </div>
    </form>
  </main>
</template>

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