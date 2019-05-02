<template>
  <div id="app">
    <div style="padding-bottom:100px;">

    <router-view ></router-view>
    </div>
    <footer-page></footer-page>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    FooterPage: resolve => require(["@/components/footer.vue"], resolve)
  }
};
</script>
<style>
#main {
  width: auto;
  margin-left: auto;
  margin-right: auto;
}

html body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #fff;
  min-height: 100vh;

  display: flex;

  flex-direction: column;
}
</style>

