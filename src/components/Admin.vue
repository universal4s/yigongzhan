<template>
  <div>
    <div>
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
</style>