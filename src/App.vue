<template>
  <div id="app">
    <router-view></router-view>
    <footer-page></footer-page>
  </div>
</template>

<script>
import Index from "./components/index.vue";
import FooterPage from "./components/footer";

export default {
  name: "App",
  components: {
    Index,
    FooterPage
  }
};
</script>
<style>
#main {
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
html {
  height: 100%;
}
body {
  background-color: #fff;
  min-height: 100vh;

  display: flex;

  flex-direction: column;
}
</style>

