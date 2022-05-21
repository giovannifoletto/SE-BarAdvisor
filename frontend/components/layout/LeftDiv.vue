<script>
export default {
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

      window.location.href = "/"
    },
  },
};
</script>

<template>
  <div>
    <h1>Account</h1>
    <ButtonsPrimary
      title="Logout"
      @buttonClicked="
        {
          logOut();
        }
      "
    />
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
h1 {
  padding-bottom: 25px;
}
</style>