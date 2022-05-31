<template>
  <form>
    <div class="form-group">
      <label for="exampleInputPassword1">Inserire Password</label>
      <input
        v-model="password"
        type="text"
        class="form-control"
        id="Password"
        placeholder="Password"
      />
      <small id="Password" class="form-text text-muted"
        >Per recuperare la propria password inserire la propria mail o il
        proprio username e controllare la casella di posta.</small
      >
    </div>
    <div class="myflex">
      <div>
        <ButtonsPrimary
          title="Manda Mail di Recupero"
          @buttonClicked="handlePasswordRecovery()"
        />
      </div>
      <NuxtLink to="/login">
        <ButtonsSecondary title="Torna indietro" />
      </NuxtLink>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      dataUrl: this.$route.params,
      password: null,
    };
  },
  methods: {
    async handlePasswordRecovery() {
      const user = this.$axios({
        url: `/auth/resetpassword/${this.dataUrl}`,
        method: "PUT",
        data: { password: this.password },
      });
    },
  },
};
</script>