<template>
  <div class="wrap container-fluid">
    <div class="aside">
      <b-nav vertical>
        <b-nav-item active :to="{path:'/main/active/all-active'}">义工管理</b-nav-item>
        <b-nav-item :to="{path:'/main/active/add-active'}">活动管理员</b-nav-item>

        <!-- <b-nav-item> -->
        <!-- <router-link :to="{path:'/login'}">其他1</router-link> -->
        <!-- </b-nav-item> -->
        <!-- <b-nav-item>其他2</b-nav-item> -->
        <!-- <b-nav-item>其他3</b-nav-item> -->
      </b-nav>
    </div>
    <div class="content container">
      <admin-list></admin-list>
    </div>
  </div>
</template>
<script>
import AdminList from "./adminComponent/UserList.vue";
export default {
  name: "SetAdmin",
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    AdminList
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style scope>
.wrap {
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
}
.aside {
  width: 150px;
  flex-grow: 2;
  /* position: fixed; */
}
.content {
  /* flex-grow: 8; */
}
</style>