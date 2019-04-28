<template>
  <div>
    <div>
      <b-navbar toggleable="lg" fixed="top" variant="light">
        <b-navbar-brand href="#">
          <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top">
          萤火虫义工站
        </b-navbar-brand>
        <!-- <b-navbar-brand href="#">萤火虫义工站</b-navbar-brand> -->

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{path:'/main/active'}">活动管理</b-nav-item>
            <b-nav-item :to="{path:'/main/admin'}">后台管理</b-nav-item>
          </b-navbar-nav>
          <!-- <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav> -->
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
  methods: {},
  components: {}
};
</script>
