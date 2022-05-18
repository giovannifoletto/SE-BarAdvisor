<template>
  <div>
    <LayoutHeader />
    <div class="page">
      <div class="right">
        <LayoutRightDiv />
      </div>
      <div class="content">
        <Nuxt />
      </div>
      <div class="left">
        <LayoutLeftDiv />
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>

<script setup>
</script>

<style>
.page {
  display: grid;
  grid-template-columns: 25% auto 25%;
  gap: 1rem;
  padding: 2px;
}
.content {
  /* border: 1px solid black; */
  min-height: 75vh;
}
.right{
  /* border: 1px solid black; */
  display: relative;
  padding-left: 25px
}
</style>

