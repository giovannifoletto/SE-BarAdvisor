<script>
export default{
  props: ['title'] 
}
</script>

<template>
  <button class="secondary-button" type="button">{{ title }}</button>
</template>


<style scoped>
.secondary-button {
  background-color: none;
  color: black;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  padding: 5px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
}
.secondary-button:hover {
  background-color: #a6a6a6;
}
</style>
