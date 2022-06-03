<template>
  <div class="beer">
    <Beer v-for="r in rankingBeerList" :key="r.index" :active="r.active" />
  </div>
</template>

<script>
import Beer from "@/components/icons/Beer.vue";
export default {
  props: ["ranking"],
  components: {
    Beer,
  },
  data() {
    return {
      rankingBeerList: [],
    };
  },
  mounted() {
    for (let i = 0; i < 5; ++i) {
      var r;
      if (this.ranking >= i) {
        r = { index: i, active: true };
      } else {
        r = { index: i, active: false };
      }
      this.rankingBeerList.push(r);
    }
  },
};
</script>

<style scoped>
.beer {
  padding-right: 0.7rem;
  padding-top: 0;
  margin-top: 0;
}
</style>