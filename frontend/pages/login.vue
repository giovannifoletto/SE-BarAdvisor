<template>
  <main>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Indirizzo Email</label>
        <input
          bind:value="{mail}"
          type="email"
          class="form-control"
          id="exampleInputEmail"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          bind:value="{password}"
          type="password"
          class="form-control"
          id="exampleInputPassword"
          placeholder="Password"
        />
      </div>
      <div class="myflex">
        <!--
            Adding promise loading button
        <div class="spinner-border m-5" role="status"></div>
        
        -->

        <NuxtLink to="/passwordrecovery">
          <ButtonsSecondary title='Dimenticato la password' />
        </NuxtLink>
        <NuxtLink to="/signup">
          <ButtonsSecondary title='Crea Nuovo Account' />
        </NuxtLink>
        <div>
          <ButtonsPrimary title='Login'/>
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