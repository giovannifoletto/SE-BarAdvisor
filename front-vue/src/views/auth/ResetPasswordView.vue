<template>
  <main>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="inputPassword">Inserisci nuova password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Inserisci Password"
          v-model="email"
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
          v-model="confermaEmail"
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
export default {
  name: "resetPassword",
  props: ["passwordToken"],
  components: {
    Primary,
    Secondary,
  },
  data() {
    return {
      email: "",
      confermaEmail: "",
    };
  },
  methods: {
    resetPassword() {
      console.log("Reset Password");
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