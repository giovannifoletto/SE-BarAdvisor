<template>
  <div>
    <Header></Header>
    <div class="page">
      <LeftDiv></LeftDiv>
      <div class="content">
        <Errors :error="error" />

        <router-view @error="handleError"></router-view>
      </div>
      <RightDiv></RightDiv>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import LeftDiv from "@/components/layout/LeftDiv.vue";
import RightDiv from "@/components/layout/RightDiv";
import Errors from '@/components/Errors'

export default {
  name: "AppVue",
  components: {
    Header,
    Footer,
    LeftDiv,
    RightDiv,
    Errors
  },
  data() {
    this.$store.commit("recoverState");
    return {
      error: {
        status: false,
        messaggio: "Errore di default.",
      },
    };
  },
  methods: {
    async handleError(event) {
      this.error = event;
    },
  },
};
</script>


<style>
@import "./assets/base.css";
.page {
  display: grid;
  grid-template-columns: 25% auto 25%;
  gap: 1rem;
  padding: 2px;
}
.content {
  /* border: 1px solid black; */
  min-height: 75vh;
}
</style>
