<template>
  <main class="container">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Nome Utente</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Username"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Per recuperare la propria password inserire la propria mail o il
          proprio username e controllare la casella di posta.</small
        >
      </div>
      <div class="myflex">
        <div>
          <ButtonsPrimary title="Manda Mail di Recupero" />
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