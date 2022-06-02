<template>
  <div :class="{ 'alert-secondary': !isSuccess, 'alert-success': isSuccess }" class="alert dad mt-3 border" role="alert" v-if="message.status">
    <div class="text">
      {{ message.text }}
    </div>
    <div class="cancel" v-if="isSuccess">
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
  name: "Message",
  components: {
      Cross
  },
  props: ["message", "isSuccess"],
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