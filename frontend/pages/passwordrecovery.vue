<script>
export default {
  data() {
    return {
      email: null,
      error: {
        errorText: null,
        status: false,
      },
    };
  },
  methods: {
    async handleMailRecupero() {
      if (!this.email) {
        this.error.errorText = "Necessario inserire il proprio nome utente.";
        this.error.status = true;
        return;
      }

      try {
        const user = this.$axios({
          url: "/auth/passworddimenticata",
          method: "post",
          data: { email: this.email },
        });

        if (user.status == 200) {
          window.location.href = "/login";
        } else {
          this.error.status = true;
          this.error.errorText =
            "Errore durante la comunicazione con il server, riprovare.";
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
  <main class="container pt-2">
    <ErrorDiv
      :errorText="error.errorText"
      v-if="error.status"
      @dismissError="error.status = !error.status"
    />
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Inserire Email</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="email"
          placeholder="Email"
        />
        <small id="email" class="form-text text-muted"
          >Per recuperare la propria password inserire la propria mail o il
          proprio username e controllare la casella di posta.</small
        >
      </div>
      <div class="myflex">
        <div>
          <ButtonsPrimary
            title="Manda Mail di Recupero"
            @buttonClicked="handleMailRecupero()"
          />
        </div>
        <NuxtLink to="/login">
          <ButtonsSecondary title="Torna indietro" />
        </NuxtLink>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  min-height: 60vh;
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