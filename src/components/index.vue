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
export default {
  data() {
    return {};
  },
  components: {
    NavBar: resolve => require(["@/components/nav.vue"], resolve)
  }
};
</script>
<style scoped>
.main {
  margin-top: 90px;
}
</style>
