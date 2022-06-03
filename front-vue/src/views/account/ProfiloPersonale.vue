<template>
  <div class="post">
    <div class="title">
      <div>
        <h3>{{ user.nome }}</h3>
      </div>
    </div>
    <!-- 
	<div class="under">
		<div class="img">
			<img src={imgSrc} alt="Imagine profilo" />
		</div>
		<hr />
		<div class="info px-1">
			<h5>{bio}</h5>
		</div>
	</div>
	<div class="gallery">
		<div class="info mb-3">
			<h3>Passport</h3>
		</div>
		<div class="img-gallery mb-3">
			<div class="p-2">
				{#each passport as p}
					<Badge />
				{/each}
			</div>
		</div>
	</div>
    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Locali seguiti</h3>
      </div>
      <div>
        <div>
          <CardLocale :locale="user.Array" />
        </div>
      </div>
    </div> 
    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Prossimi Eventi</h3>
      </div>
      <div v-if="user.prenotazioni.length != 0">
        <div class="comm-row">
          <CardEvento
            v-for="evento in user.prenotazioni"
            :key="evento._id"
            :evento="evento"
          />
        </div>
      </div>
      <div v-else>
        <Message
          :isSuccess="false"
          :message="{ status: true, messaggio: 'Nessun evento in programma.' }"
        />
      </div>
    </div>

    <div class="comments">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Notifiche</h3>
      </div>
      <div class="comm">
        <div class="comm-row">
          {#each notifications as n}
          <NotificationListItem />
          {/each}
        </div>
      </div>
    </div> -->

    <div class="final-button mt-3 mb-1">
      <div class="info-comments px-4 mt-3 mb-2">
        <h3>Sezione Personale</h3>
      </div>
      <div class="p-1">
        <Primary title="Cambia password" @buttonClicked="formCambiaPassoword = !formCambiaPassoword"/>
        <div class="form-cambia-password" v-if="formCambiaPassoword">
            <h1>Cambia passoword</h1>
        </div>

      </div>
      <div class="p-1">
        <Primary title="Elimina Account" />
      </div>
    </div>
  </div>
</template>

<script>
import Primary from "@/components/buttons/Primary";
import CardLocale from "@/components/CardLocale.vue";
import CardEvento from "@/components/CardEvento.vue";
import Message from "@/components/Message.vue";
export default {
  components: {
    Primary,
    CardLocale,
    CardEvento,
    Message,
  },
  data() {
    return {
      user: {},
      formCambiaPassoword: false
    };
  },
  mounted() {
    this.user = {
      nome: "Giovanni",
      prenotazioni: [],
      notifiche: [],
      email: [],
    };
  },
};
</script>

<style>
.post {
  display: flex;
  flex-flow: column nowrap;
  border-radius: 4px;
}
.title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid black;
}
.under {
  display: flex;
  flex-flow: row nowrap;
  align-content: space-around;
  justify-content: space-evenly;
  padding-top: 0.5rem;
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
  justify-content: center;
  justify-items: baseline;
}
.comm {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}
.comm-row {
  display: relative;
}
.final-button {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>