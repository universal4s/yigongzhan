<template>
  <div class="col-md-offset-3">
    <b-container fluid>
      <router-view></router-view>
    </b-container>
    <!-- <transition enter-active-class="animated fadeIn" class="trans"></transition> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: {}
    };
  },
  components: {},
  methods: {
    test() {
      this.$axios
        .get("/api/v1.0/allworks")
        .then(res => {
          this.Data = res.data;
          console.log(res.data.allworks);

          //this.check()
        })
        .catch(() => {
          console.log("调用失败");
        });
    },
    check() {
      this.Data = this.Data.replace(/\'/g, '"');
      console.log(this.Data);
    }
  }
};
</script>
<style scoped>
.trans {
  animation-duration: 0.5s;
}
.aside {
  flex: none;
  width: 220px;
}
.main {
  /* flex: auto; */
  background: #f2f2f2;
}
.content {
  flex: auto;
  display: flex;
}
.box {
  justify-content: center;
}
</style>
