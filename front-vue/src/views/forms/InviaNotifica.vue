<template>
  <main>
    <Errors :error="error" />
    <Message :message="message" />
    <form @submit.prevent="inviaNotifica">
      <div class="form-group">
        <label for="emailInput">Inserisci testo della Notifica</label>
        <input
          v-model="testo"
          type="email"
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
      message: {
        isSuccess: true,
        message: "Messaggio di conferma",
      },
    };
  },
  methods: {
    async inviaNotifica() {
      const form = {
        testo: this.testo,
        locale: this.localeID,
        evento: this.eventoID,
      };

      const opzioniRichiesta = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify(form),
      };

      try {
        const res = await fetch("MISSING ENDPOINT", opzioniRichiesta);
        const data = await res.json();

        if (data.success) {
          this.message.status = true;
          this.message.messaggio = data.message || "Messaggio inviato correttamente.";
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