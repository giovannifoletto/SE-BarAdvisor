<script>
export default {
  data() {
    return {
      passwordData: {
        visible: false,
        buttonText: "Cambia Password",
      },
      error: {
        status: false,
        errorText: null,
      },
      oldPassword: null,
      newPassword1: null,
      newPassword2: null,
    };
  },
  methods: {
    logOut() {
      try {
        localStorage.removeItem("authToken");
      } catch {
        console.log("No localStorage token");
      }

      try {
        sessionStorage.removeItem("authToken");
      } catch {
        console.log("No sessionStorage token");
      }

      window.location.href = "/";
    },
    async togglePassData() {
      if (this.passwordData.visible) {
        this.passwordData.visible = false;
        this.passwordData.buttonText = "Cambia Password";
        // TODO: data di cambia password ?
        try {
          const changeP = this.$axios({
            url: `http://localhost:4000/auth/cambioPassword`,
            method: "PUT",
            headers: {
              Authorizations: 'Bearer' + this.state.getToken(),
            },
            data: {
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
            },
          });

          if(changeP.status ==200){
            console.log("Password Changed");
          }
        } catch (err) {
          console.log(err);
          this.error.status = true;
          this.error.errorText = err || "Errore imprevisto, riprovare";
        }
      } else {
        this.passwordData.buttonText = "Clicca per continuare";
        this.passwordData.visible = true;
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Account</h1>
    <div class="myflex-col">
      <ButtonsPrimary title="Logout" @buttonClicked="logOut()" />
      <div id="cambiaPassword" v-if="passwordData.visible">
        <ErrorDiv
          :errorText="error.errorText"
          v-if="error.status"
          @dismissError="error.status = !error.status"
        />
        <div class="form-group">
          <label for="inputPassword">Inserisci Password</label>
          <input
            v-bind="oldPassword"
            type="password"
            class="form-control"
            placeholder="Inserisci Password"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Nuova Password</label>
          <input
            v-bind="newPassword1"
            type="password"
            class="form-control"
            placeholder="Inserisci Password"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Ripeti nuova Password</label>
          <input
            v-bind="newPassword2"
            type="password"
            class="form-control"
            placeholder="Inserisci Password"
            required
          />
        </div>
      </div>
      <ButtonsPrimary
        :title="passwordData.buttonText"
        @buttonClicked="togglePassData()"
      />
    </div>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
h1 {
  padding-bottom: 25px;
}
.myflex-col {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: var(--default-padding);
}
</style>