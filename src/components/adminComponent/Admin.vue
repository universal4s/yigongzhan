<template>
  <div class="wrap container-fluid">
    <div class="aside">
      <b-nav vertical>
        <b-nav-item active :to="{name:'volunadmin'}">义工管理</b-nav-item>
        <b-nav-item :to="{name:'pubadmin'}">活动管理员</b-nav-item>
      </b-nav>
    </div>
    <div class="content container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import { resolve } from "path";
export default {
  name: "SetAdmin",
  data() {
    return {
      activeName: "first"
    };
  },
  components: {

  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.wrap {
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
}
.aside {
  display: flex;
  flex: auto;
  /* position: fixed; */
  width: 15%;
}
.content {
  flex: auto;
}
</style>
