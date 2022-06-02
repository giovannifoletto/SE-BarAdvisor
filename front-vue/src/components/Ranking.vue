<template>
  <div class="beer">
    <Beer v-for="index in ranking" :key="index" :active="true" />
  </div>
</template>

<script>
import Beer from "@/components/icons/Beer.vue";
export default {
  props: ["ranking"],
  components: {
    Beer,
  },
};
</script>

<style scoped>
.beer {
  padding-right: 0.7rem;
}
</style>