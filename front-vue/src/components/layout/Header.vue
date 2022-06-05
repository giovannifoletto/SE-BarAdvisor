<template>
  <nav>
    <div class="container navbar">
      <h1>Bar Advisor</h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
nav {
  background-color: var(--ba-backgroudcolor);
  color: var(--primary);
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  padding-top: 5px;
  border-bottom: 1px solid black;
  font-size: var(--headline1-size);
  font-weight: var(--headline1-weight);
}
.navbar {
  display: flex;
  flex-flow: row;
  justify-content: center;
}
</style>
