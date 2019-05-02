<template>
  <div>
    <div>
      <!-- <b-navbar toggleable="lg" fixed="top" variant="light">
        <b-navbar-brand href="#">
          <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top">
          萤火虫义工站
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{path:'/main/active'}">活动管理</b-nav-item>
            <b-nav-item :to="{path:'/main/admin'}">后台管理</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>-->
      <b-navbar toggleable="lg" type="light" variant="info">
        <b-navbar-brand href="#">萤火虫义工站</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{path:'/main/active'}">活动管理</b-nav-item>
            <b-nav-item :to="{path:'/main/admin'}">后台管理</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <b>设置</b>
              </template>
              <b-dropdown-item href="#" @click="logout">退出</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.replace({ path: "/login" });
    }
  },
  components: {}
};
</script>
