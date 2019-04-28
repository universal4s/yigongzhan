<template>
  <div>
    <div>
      <nav-bar></nav-bar>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
   
<script>
import NavBar from "./nav.vue";
// import MainPage from "./main.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavBar
    // MainPage,
  }
};
</script>
<style scoped>
.main {
  margin-top: 90px;
}
</style>
