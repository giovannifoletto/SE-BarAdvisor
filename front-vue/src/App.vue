<template>
  <div>
    <Header></Header>
    <div class="page">
      <RightDiv></RightDiv>
      <div class="content">
        <router-view></router-view>
      </div>
      <LeftDiv></LeftDiv>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import LeftDiv from "@/components/layout/LeftDiv.vue";
import RightDiv from "@/components/layout/RightDiv";

export default {
  name: "AppVue",
  components: {
    Header,
    Footer,
    LeftDiv,
    RightDiv,
  },
  data(){
    this.$store.commit('recoverState')
    return{}
  }
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
