<template>
    <h1>Pagina evento {{ eventoID }}</h1>
</template>

<script>
export default {
    name: 'paginaEvento',
    props: ['eventoID'],
    data() {
        return {
            evento: null
        }
    },
    async mounted() {
        try {
            const res = await fetch('http://localhost:4000/api/v1/eventi/' + this.eventoID)
            const data = await res.json()

            if (data.success)
                this.evento = data.evento


        } catch (error) {
            console.log(error)
        }
    }
}
</script>
