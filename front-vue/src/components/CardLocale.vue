<template>
  <div class="comment my-2">
    <div class="left">
      <account />
    </div>
    <div class="right py-2">
      <div class="title-event">
        <h5 class="pb-0 pt-0 px-2">{{ evento.nome[0].toUpperCase() + evento.nome.slice(1, 1000)  }}</h5>
        <h6 v-if="evento.dataInizio < (new Date().now)" class="pb-0 pt-0 px-2">Data: {{ evento.dataInizio }}</h6>
      </div>

      <div class="column"  v-if="$store.state.token">
        <div class="unfollow">
          <div>
            <router-link :to="{ name: 'paginaEvento', params: { eventoID: evento._id } }">
              <Secondary title="Visualizza" />
            </router-link>
          </div>
          <div>
            <Secondary title="Disiscriviti" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/icons/Account.vue"
import Secondary from '@/components/buttons/Secondary'

export default {
  components: { Account, Secondary },
  props: ["locale"],
};
</script>

<style scoped>
.comment {
  display: flex;
  flex-flow: row nowrap;
  row-gap: 10px;
  border: 1px solid black;
  border-radius: 4px;
}
.left {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.right {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  text-align: start;
  column-gap: 1px;
  padding-right: 0.7rem;
  width: 100%;
}
hr {
  padding: 0;
  margin: 0.3rem;
}
.title-event {
  display: flex;
  flex-flow: column nowrap;
}
.unfollow {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  text-align: center;
  gap: 20px;
}
.column {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
}
</style>