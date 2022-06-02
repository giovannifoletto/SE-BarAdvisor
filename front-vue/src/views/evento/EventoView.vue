<template>
    
<div class="event" v-if="evento">
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
            <router-link :to="{ name: 'paginaLocale', params: { localeID: evento.locale._id } }">
                <Secondary
                    title="Visita il Locale gestore dell'evento"
                />
            </router-link>
		</div>
	</div>

    <div class="info">
        <h5>{{ evento.descrizione }}</h5>
    </div>

	<div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Recensioni</h3>

        <Errors :error="error" />

        <div class="form-recensione" v-if="$store.state.token">
          <div>
            <input
              type="text"
              class="form-control"
              required
              v-model="recensione.commento"
            />
            <div>
                <select v-model="recensione.votazione" required>
                  <option :value="index" v-for="index in 5" :key="index">{{index}}</option>
                </select>
            </div>
            <Primary title="Commenta" @buttonClicked="postRecensione"/>
          </div>
        </div>

      </div>
      <div class="comm-row">
        <Recensione
          v-for="recensione in locale.recensioni"
          :key="recensione._id"
          :recensione="recensione"
        />
      </div>
    </div>
</div>
</template>

<script>
import Primary from "@/components/buttons/Primary.vue";
import Secondary from "@/components/buttons/Secondary.vue";

export default {
    name: 'paginaEvento',
    props: ['eventoID'],
    components: {
        Primary,
        Secondary
    },
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