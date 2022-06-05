<template>
  <div class="comment">
    <div class="left">
      <Account />
    </div>
    <div class="right py-2">
      <div class="title-event px-2">
        <h5>
          {{ evento }}
        </h5>
        <hr />
        <h5>
          tenuto da: {{ locale }}, in data
          <h4>
            {{ dataEvento }}
          </h4>
        </h5>
      </div>
      <hr />
      <div>
        {{ messaggio }}
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account";
export default {
  components: {
    Account,
  },
  props: ["testoCompleto"],
  data() {
    return {
      messaggio: "",
      evento: "",
      dataEvento: "",
      locale: "",
      months: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ],
    };
  },
  mounted() {
    this.messaggio = this.testoCompleto.split("//")[0];
    this.evento = this.testoCompleto.split("//")[1];
    this.dataEvento = this.testoCompleto.split("//")[2];
    this.locale = this.testoCompleto.split("//")[3];
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
  justify-content: space-between;
  text-align: start;
  column-gap: 1px;
  padding-right: 0.7rem;
  width: 100%;
}
hr {
  padding: 0;
  margin: 0.3rem;
}
.title-event {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
