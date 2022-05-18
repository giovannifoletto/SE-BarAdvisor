<template>
  <form class="container">
    <div class="form-group mb-1">
      <label for="nomeUtente">Nome utente</label>
      <input
        type="text"
        class="form-control"
        id="nomeUtente"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
    <div class="form-group mb-1">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >Non condivideremo queste informazioni con nessuno.</small
      >
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
        <ButtonsPrimary title="Registrati" />
      </div>
      <NuxtLink to="/signup">
        <ButtonsSecondary title="Torna indietro" />
      </NuxtLink>
    </div>
  </form>
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