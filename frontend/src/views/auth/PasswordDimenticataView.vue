<template>
  <main class="container pt-2">

    <Message :messaggio="messaggio" isSuccess="true"/>

    <Errors :error="error" />

    <form @submit.prevent="mandaMail">
      <div class="form-group">
        <label for="exampleInputEmail1">Inserire Email</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="email"
          placeholder="Email"
          required
        />
        <small id="email" class="form-text text-muted"
          >Per recuperare la propria password inserire la propria mail o il
          proprio username e controllare la casella di posta.</small
        >
      </div>
      <div class="myflex">
        <div>
          <Primary title="Manda Mail di Recupero" type="submit"/>
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
import Message from '@/components/Message.vue'
import Errors from '@/components/Errors.vue'

import config from '@/config'

export default {
    name: 'passwordDimenticata',
    components: {
    Primary,
    Secondary,
    Message,
    Errors
},
    data(){
        return {
            email: '',
            messaggio: {
              messaggio: "Inserire email",
              status: false
            },
            error: {
              messaggio: "Messaggio di errore", 
              status: false
            }
        }
    },
    methods: {
        async mandaMail(){
            const opzioneRichiesta = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.email })
            }
            try {
              const res = await fetch(`${config.baseURL}/auth/passworddimenticata`, opzioneRichiesta)
  
              const data = await res.json()

              if (data.success) {
                this.messaggio.messaggio = 'Email inviata correttamente'
                this.messaggio.status = true
              }
              else {
                this.error.messaggio = data.error || data.message || 'Qualcosa è andato storto'
                this.error.status = true
              }
              
            } catch (error) {
              this.error.messaggio = error || 'Errore imprevisto con il server'
              this.error.status = true
            }
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