<template>
  <main>
    <form>
      <div class="form-group">
        <label for="emailInput">Indirizzo Email</label>
        <input
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
          type="password"
          class="form-control"
          placeholder="Inserisci Password"
          required
        />
      </div>
      <div class="form-group myflex">
        <div class="form-check checkbox">
          <input
            class="form-check-input"
            type="checkbox"
            id="remainLoggedIn"
          />
          <div>
            <label class="form-check-label" for="remainLoggedIn">
              Resta collegato
            </label>
          </div>
        </div>
      </div>
      <div class="myflex">
        <router-link to="/passwordrecovery">
          <ButtonsSecondary title="Dimenticato la password" />
        </router-link>
        <router-link :to="{name: 'registrazione'}">
          <ButtonsSecondary title="Crea Nuovo Account" />
        </router-link>
        <div>
          <div class="py-1"></div>
          <ButtonsPrimary title="Login" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import ButtonsPrimary from '@/components/buttons/Primary.vue'
import ButtonsSecondary from '@/components/buttons/Secondary.vue'

export default {
    name: 'LoginView',
    components: {
        ButtonsPrimary,
        ButtonsSecondary
    }
}
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