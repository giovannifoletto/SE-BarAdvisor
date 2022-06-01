
<template>
  <div class="container pt-2">
    <form class="container">
      <div class="form-group mb-1">
        <label for="nome">Nome utente</label>
        <input
          type="text"
          class="form-control"
          id="nome"
          placeholder="Inserisci Nome Utente"
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
        />
      </div>
      <div class="form-group mb-1">
        <label for="password2">Conferma Password</label>
        <input
          type="password"
          class="form-control"
          id="password2"
          placeholder="Password"
        />
      </div>
      <div class="myflex">
        <div>
          <div class="py-1"></div>
          <Primary
            title="Registrati"
          />
        </div>
        <router-link :to="{name: 'registrazione'}">
          <Secondary title="Torna indietro" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";

export default {
  name: "RegistrazionView",
  components: {
    Secondary,
    Primary,
  },
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