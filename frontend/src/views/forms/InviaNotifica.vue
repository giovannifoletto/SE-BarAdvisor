<template>
  <main>
    <Errors :error="error" />
    <Message :messaggio="messaggio" />

    <form @submit.prevent="inviaNotifica">
      <div class="form-group">
        <label for="text">Inserisci testo della Notifica</label>
        <input
          v-model="testo"
          class="form-control"
          placeholder="Inserisci testo notifica"
          required
        />
      </div>
      <div class="myflex">
        <router-link
          :to="{ name: 'paginaEvento', params: { eventoID: eventoID } }"
        >
          <Secondary title="Torna indietro." />
        </router-link>
        <div>
          <div class="py-1"></div>
          <Primary title="Invia notifica" type="submit" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import Errors from "@/components/Errors.vue";
import Message from "@/components/Message.vue";
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";
import config from '@/config'

export default {
  components: {
    Primary,
    Secondary,
    Errors,
    Message,
  },
  props: ["localeID", "eventoID"],
  data() {
    return {
      testo: "",
      error: {
        status: false,
        messaggio: "Messggio di errore",
      },
      messaggio: {
        isSuccess: false,
        messaggio: "Messaggio di conferma",
      },
    };
  },
  methods: {
    async inviaNotifica() {
      const opzioniRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify({ messaggio: this.testo }),
      };

      try {
        const res = await fetch(`${config.baseURL}/locali/${this.localeID}/eventi/${this.eventoID}/notifiche`, opzioniRichiesta);
        const data = await res.json();

        if (data.success) {
          this.messaggio.status = true
          this.messaggio.messaggio = data.message || "Messaggio inviato correttamente."

          this.$router.push({ name: 'paginaLocale' })
        } else {
          this.error.status = true;
          this.error.messaggio =
            data.error || data.message || "Errore interno, riprovare.";
        }
      } catch (error) {
        this.error.status = true;
        this.error.messaggio = error || "Errore imprevisto, ripro.";
      }
    },
  },
};
</script>