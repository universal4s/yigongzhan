<template>
  <div>
    <div class="wrap container-fluid">
      <!-- <b-container fluid class="main"> -->
      <div class="aside">
        <b-nav vertical>
          <b-nav-item active :to="{path:'/main/active/all-active'}">活动列表</b-nav-item>
          <b-nav-item :to="{path:'/main/active/add-active'}">新增活动</b-nav-item>

          <!-- <b-nav-item> -->
          <!-- <router-link :to="{path:'/login'}">其他1</router-link> -->
          <!-- </b-nav-item> -->
          <!-- <b-nav-item>其他2</b-nav-item> -->
          <!-- <b-nav-item>其他3</b-nav-item> -->
          
        </b-nav>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
      <!-- </b-container> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrap {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
}
.aside {
  width: 150px;
  flex-grow: 2;
  /* position: fixed; */
}
.content {
  flex-grow: 8;
}
</style>
