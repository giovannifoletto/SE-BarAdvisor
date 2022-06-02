<template>
  <div class="alert alert-success dad mt-3" role="alert" v-if="message.status">
    <div class="text">
      {{ message.text }}
    </div>
    <div class="cancel">
      <button @click="message.status = !message.status">
        <Cross />
      </button>
    </div>
  </div>
</template>

<script>
import Cross from '@/components/icons/Cross'

/**
 * @required
 * @param {Object} message - Oggetto messaggio che setta il testo e il visible.
 * @param {String} message.text - Parametro del testo del messaggio.
 * @param {bool} message.status - Perametro per settare la visibilità del messaggio.
 */
export default {
  name: "Errors",
  components: {
      Cross
  },
  props: ["message"]
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