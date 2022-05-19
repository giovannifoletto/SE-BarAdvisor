<script>
export default {
  props: ["title"],
  emit: ["buttonClicked"],
};
</script>

<template>
  <button type="button" class="primary-button" @click="$emit('buttonClicked', $event)">{{ title }}</button>
</template>

<style scoped>
.primary-button {
  border-bottom: 1px solid black;
  background-color: #ff9922;
  color: black;
  border: none;
  padding: 5px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 5px;
}
.primary-button:hover {
  background-color: var(--primaryHover);
}
</style>
