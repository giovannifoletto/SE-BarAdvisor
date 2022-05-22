<template>
  <div>
    {{ pageUrl }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageUrl: this.$route.params,
    };
  },
  middleware: 'auth',
};
</script>