<template>
  <div class="alert alert-danger dad mt-3" role="alert" v-if="error.status">
    <div class="text">
      {{ error.text }}
    </div>
    <div class="cancel">
      <button @click="error.status = !error.status">
        <Cross />
      </button>
    </div>
  </div>
</template>

<script>
import Cross from '@/components/icons/Cross'

/**
 * @required
 * @param {Object} error - Oggetto errore che setta il testo e il visible.
 * @param {String} error.text - Parametro del testo dell'errore.
 * @param {bool} error.status - Perametro per settare la visibilità del messaggio di errore.
 */
export default {
  name: "Errors",
  components: {
      Cross
  },
  props: ["error"]
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