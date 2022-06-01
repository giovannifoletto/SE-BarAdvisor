<template>
  <main class="container pt-2">
    <form @submit.prevent="mandaMail">
      <div class="form-group">
        <label for="exampleInputEmail1">Inserire Email</label>
        <input
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
          <Primary title="Manda Mail di Recupero"/>
        </div>
        <router-link :to="{name: 'login'}">
          <Secondary title="Torna indietro" type="submit" />
        </router-link>
      </div>
    </form>
  </main>
</template>

<script>
import Primary from '@/components/buttons/Primary.vue'
import Secondary from '@/components/buttons/Secondary.vue'

export default {
    name: 'passwordDimenticata',
    components: {
        Primary,
        Secondary
    },
    data(){
        return {
            email: "",
        }
    },
    methods: {
        async mandaMail(){
            const opzioneRichiesta = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: this.email})
            }
            const res = await fetch('http://localhost:4000/api/v1/auth/passworddimenticata', opzioneRichiesta)

            const data = await res.json()

            console.log(data)

        }
    }
}
</script>

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