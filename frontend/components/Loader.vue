<template>
  <div class="d-flex justify-content-center mt-5 pt-5">
    <div
      class="spinner-border"
      role="status"
      style="color: var(--primary); width: { dim }; height: { dim }"
    />
  </div>
</template>

<script>
export default {
    props: ["dim"],
}
</script>