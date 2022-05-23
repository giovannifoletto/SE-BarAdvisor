<script>
export default {
  data() {
    return {
      error: {
        status: false,
        errorText: null,
      },
      nuovoEvento: {
        nome: null,
        locale: null,
        descrizione: null,
        dataInizio: null,
      },
      promise: false,
      corretto: false,
    };
  },
  methods: {
    async creaNuovoEvento() {
      this.promise = true;

      try {
        const evento = this.$axios({
          url: `${baseUrl}/eventi`,
          method: "POST",
          data: this.nuovoEvento,
        });

        if (evento.success) {
          this.corretto = true;
        } else {
          console.log(err);
          error.status = true;
          error.errorText = evento.data.message || "Errore imprevisto, riprovare";
        }
      } catch (err) {
        console.log(err);
        error.status = true;
        error.errorText = err || "Errore imprevisto, riprovare";
      }
    },
  },
};
</script>

<template>
  <main>
    <ErrorDiv
      :errorText="error.errorText"
      v-if="error.status"
      @dismissError="error.status = !error.status"
    />

    <form>
      <h1 class="text-center">Crea un nuovo Evento</h1>
      <div class="form-group">
        <label for="nomeEvento">Nome Evento</label>
        <input
          v-model="nuovoEvento.nome"
          type="text"
          class="form-control"
          placeholder="Inserisci nome evento"
          required
        />
      </div>
      <br />
      <div class="form-group">
        <label for="inputLocale">Locale</label>
        <input
          v-model="nuovoEvento.locale"
          type="text"
          class="form-control"
          placeholder="Inserisci nome del locale"
          required
        />
      </div>
      <br />
      <div class="form-group">
        <label for="descrizioneEvento">Descrizione</label>
        <input
          v-model="nuovoEvento.descrizione"
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
          v-model="nuovoEvento.dataInizio"
          type="date"
          class="form-control"
          placeholder="Inserisci data inizio evento"
          required
        />
      </div>

      <div class="myflex">
        <div>
          <Loader v-if="promise" dim="4" />
          <div class="py-1">
            <h3 v-if="corretto">Inserimento eseguito correttamente.</h3>
          </div>

          <ButtonsPrimary
            title="Login"
            @buttonClicked="creaNuovoEvento($event)"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped>
.myflex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>