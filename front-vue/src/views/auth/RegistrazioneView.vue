<template>
  <div class="myflex">
    <NuxtLink to="/signup/cliente">
      <ButtonsSecondary title='Sono un cliente' />
    </NuxtLink>
    <NuxtLink to="/signup/gestorelocale">
      <ButtonsSecondary title='Sono un gestore di locale' />
    </NuxtLink>
    <NuxtLink to="/login"> <ButtonsPrimary title='Torna indietro' /> </NuxtLink>
  </div>
</template>

<style scoped>
.myflex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 25px;
}
</style>