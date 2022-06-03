<template>
  <div class="comment my-2">
    <div class="left">
      <Account height="{val}" width="{val}" />
    </div>
    <div class="right py-2">
      <div class="upper">
        <h5 class="pb-0">
          {{ nomeUtente }}
        </h5>
      </div>
      <hr />
      <div class="commento">
        <h6>{{ commento }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account";
import Ranking from "./Ranking.vue";

export default {
  name: "Commento",
  props: ["idUtente", "commento"],
  data() {
    return {
      nomeUtente: "",
    };
  },
  components: {
    Account,
    Ranking,
  },
  async mounted() {
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/auth/utenti/${this.idUtente}`
      );
      const data = await res.json();

      if (data.success) {
        this.nomeUtente = data.nomeUtente;
      } else {
        this.$emit("fetchError");
      }
    } catch (error) {
      console.log(error, this.recensione.utente);
      this.$emit("fetchError");
    }
  },
};
</script>

<style>
.comment {
  display: flex;
  flex-flow: row nowrap;
  row-gap: 10px;
  border: 1px solid black;
  border-radius: 4px;
  min-width: 100%;
}
.left {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.right {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  justify-items: baseline;
  column-gap: 1px;
}
.upper {
  display: flex;
  flex-flow: row nowrap;
  justify-items: baseline;
  column-gap: 40px;
}
.beer {
  padding-right: 0.7rem;
}
.commento {
  text-align: start;
}
hr {
  padding: 0;
  margin: 0.3rem;
}
</style>