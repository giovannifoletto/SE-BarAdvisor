<template>
    
<div class="event">
	<div class="title">
		<div>
			<h3>{{ evento.nome }}</h3>
		</div>
		<div class="other">
			<Primary title="Prenota"/>
		</div>
	</div>
	<div class="description">
		<!--<div class="img">
			<img src=imgSrc alt="Imagine Evento" />
		</div>-->

		<div class="location">
			<Secondary
				title="Visita il Locale gestore dell'evento"
			/>
		</div>

		<div class="info">
			<h5>{{ evento.descrizione }}</h5>
		</div>
	</div>
</div>
</template>

<script>

export default {
    name: 'paginaEvento',
    data() {
        return {
            evento: {
                id: "",

            }
        }
    },
    mounted() {

    }
}
</script>



<style>
	.event {
		display: flex;
		flex-flow: column nowrap;
		border-radius: 4px;
		justify-content: baseline;
	}
	.title {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		justify-items: baseline;
		padding: 10px;
		border-bottom: 1px solid black;
	}
	.description {
		display: grid;
		grid-template-columns: repeat(2, 50%);
		grid-template-rows: 10% 90%;
		padding-top: 0.5rem;
	}
	.location {
		grid-column: 2;
		grid-row: 1;
		width: 100%;
		text-align: center;
	}
	.info {
		grid-column: 2;
		grid-row: 2;
	}
	.img {
		text-align: center;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	.gallery {
		display: flex;
		flex-flow: column nowrap;
		text-align: center;
		align-content: space-around;
		justify-content: space-evenly;
		padding-top: 0.5rem;
	}
	.img-gallery {
		border: 1px black solid;
	}
	.comments {
		display: flex;
		flex-flow: column nowrap;
		text-align: center;
		align-content: space-around;
		justify-content: space-evenly;
		padding-top: 0.5rem;
	}
	.info-comments {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		justify-items: baseline;
	}
	.comm {
		display: flex;
		flex-flow: column;
		align-items: center;

		gap: 0.5rem;
	}
	.comm-row {
		display: relative;
	}
</style>