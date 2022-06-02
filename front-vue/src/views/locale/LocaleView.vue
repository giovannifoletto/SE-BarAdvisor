<template>
    <h1>pagina locale {{ localeID }}</h1>
</template>

<script>

export default {
    name: 'paginaLocale',
    props: ['localeID'],
    data() {
        return {
            locale: null
        }
    },
    async mounted() {
        const res = await fetch('http://localhost:4000/api/v1/locali/' + this.localeID)
        const data = await res.json()

        console.log(data)
    }
}
</script>
