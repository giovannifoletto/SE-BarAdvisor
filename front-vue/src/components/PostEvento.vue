<script>
export default {
    props: ["nome", "locale", "descrizione", "dataInizio"]
}
</script>

<template>
  <div class="post">
    <div class="title pt-2">
      <div class="account">
        <div>
          <IconsAccount />
        </div>
        <NuxtLink :to="/locale/ + {locale}" class="px-3">
          <h3>{{ nome }}</h3>
        </NuxtLink>
      </div>
    </div>
    <div class="under">
      <div class="info p-1">
        <h6>Data di inizio</h6>
        <h5>{{ dataInizio }}</h5>
        <h6>informazioni</h6>
        <h5>{{ descrizione }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped>
	.post {
		display: flex;
		flex-flow: column nowrap;
		border: 1px solid black;
		border-radius: 4px;
		justify-content: baseline;
	}
	.title {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: 5px;
		border-bottom: 1px solid black;
	}
	.account {
		display: flex;
		flex-flow: row nowrap;
		justify-content: baseline;
		padding-left: 5px;
		display: flex;
		column-gap: 10px;
	}
	.under {
		text-align: center;
	}
</style>