<script>
export default {
  props: ["errorText"],
  emits: ["dismissError"],
  methods: {
    handleCancelError() {
      this.$emit("dismissError");
    },
  },
};
</script>

<template>
  <div class="alert alert-danger dad" role="alert">
    <div class="text">
      {{ errorText }}
    </div>
    <div class="cancel">
      <button
        @click="
          {
            handleCancelError();
          }
        "
      >
        <IconsCross />
      </button>
    </div>
  </div>
</template>

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