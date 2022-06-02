
<template>
  <main>
    <Errors :error="error" />

    <form>
      <h1 class="text-center">Crea un nuovo Evento</h1>
      <div class="form-group">
        <label for="nomeEvento">Nome Evento</label>
        <input
          v-model="evento.nome"
          type="text"
          class="form-control"
          placeholder="Inserisci nome evento"
          required
        />
      </div>
      <br />
      <div class="form-group">
        <label for="descrizioneEvento">Descrizione</label>
        <input
          v-model="evento.descrizione"
          type="text"
          class="form-control"
          placeholder="Inserisci breve descrizione"
          required
        />
      </div>
      <br />
      <div class="form-group">
        <label for="dataInizio">Data Inizio</label>
        <input
          v-model="evento.dataInizio"
          type="datetime-local"
          class="form-control"
          placeholder="Inserisci data inizio evento"
          required
        />
      </div>

      <div class="myflex">
        <Primary title="Conferma" @buttonClicked="postEvento" />
      </div>
    </form>
  </main>
</template>

<script>
import Errors from "@/components/Errors";
import Primary from "@/components/buttons/Primary";
import Secondary from "@/components/buttons/Secondary";

export default {
  components: {
    Errors,
    Primary,
    Secondary,
  },
  props: ["localeID"],
  data() {
    return {
      evento: {
        nome: "",
        dataInizio: "",
        descrizione: "",
      },
      error: {
        text: null,
        status: false,
      },
    };
  },
  methods: {
    async postEvento() {
      const opzioniRichiesta = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.$store.token || localStorage.getItem('token')}` },
        body: JSON.stringify(this.evento),
      };
      console.log(opzioniRichiesta)
      try {
        const res = await fetch(
          "http://localhost:4000/api/v1/locali/" + this.localeID + "/eventi",
          opzioniRichiesta
        );
        const data = await res.json();

        console.log(data)

        if (data.success) this.$router.push({ name: "paginaLocale" });
        else {
          this.error.status = true
          this.error.text = data?.message || data?.error || "Errore nel fetch."
        }
      } catch (error) {
        console.log(error)
        this.error.status = true
        this.error.text = error || "Errore imprevisto."
      }
    },
  },
};
</script>


<style>
.myflex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>