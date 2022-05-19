<script>
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async handleLogin(event) {
      try {
        const user = await this.$axios({
          method: "post",
          url: "auth/login",
          data: this.user,
        });
        console.log(user);
      } catch (err) {
        console.log(err);
      }
      // console.log("Custom events: ", event)
    },
  },
};
</script>

<template>
  <main>
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
</style>