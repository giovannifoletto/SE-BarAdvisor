<template>
  <div :class="{ 'alert-secondary': !isSuccess, 'alert-success': isSuccess }" class="alert dad mt-3 border" role="alert" v-if="messaggio.status">
    <div class="text">
      {{ messaggio.messaggio }}
    </div>
    <div class="cancel" v-if="isSuccess">
      <button @click="messaggio.status = !messaggio.status">
        <Cross />
      </button>
    </div>
  </div>
</template>

<script>
import Cross from '@/components/icons/Cross'

/**
 * @required
 * @param {Object} messaggio - Oggetto messaggio che setta il testo e il visible.
 * @param {String} messaggio.messaggio - Parametro del testo del messaggio.
 * @param {bool} messaggio.status - Perametro per settare la visibilità del messaggio.
 */
export default {
  name: "Messaggio",
  components: {
      Cross
  },
  props: ["messaggio", "isSuccess"],
};
</script>

<style scoped>
div.dad {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>