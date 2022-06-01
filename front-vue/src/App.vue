<template>
  <div>
    <!-- CSS only -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
      crossorigin="anonymous"
    />

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
};
</script>


<style scoped>
@import "@/assets/base.css";
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
