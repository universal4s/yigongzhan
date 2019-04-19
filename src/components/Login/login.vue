<template>
  <div>
    <div class="header">
      <b-navbar variant="faded" type="light">
        <b-navbar-brand tag="h1" class="mb-0">萤火虫义工站</b-navbar-brand>
      </b-navbar>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-4">
          <div>
            <b-carousel
              :interval="3000"
              id="carousel-fade"
              style="text-shadow: 0px 0px 2px #000"
              fade
              indicators
              img-width="1024"
              img-height="480"
            >
              <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=10"></b-carousel-slide>
              <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=12"></b-carousel-slide>
              <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=22"></b-carousel-slide>
            </b-carousel>
          </div>
        </div>
        <div class="col-md-3 login-wrap">
          <div class="login-header">
            <h2>登录</h2>
          </div>
          <div>
            <b-form>
              <b-form-group label="用户名" label-for="username">
                <b-form-input id="username" required v-model="UserInfo.username"></b-form-input>
              </b-form-group>
              <b-form-group label="密码" label-for="password">
                <b-form-input id="password" type="password" required v-model="UserInfo.password"></b-form-input>
              </b-form-group>
            </b-form>
            <b-button variant="primary" class="btn-md btn-block submit" @click="login()">登录</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserInfo: {
        username: "22",
        password: "66666"
      }
    };
  },
  methods: {
    login() {
      let _this = this;
      let login_form = new FormData();
      login_form.append("username", _this.UserInfo.username);
      login_form.append("password", _this.UserInfo.password);
      _this.$axios
        .post("/volunteer/login", login_form)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            _this.$router.replace({ path: "actives" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    get_dynamic_route(user_type) {
      var router_list = [];
      if (user_type == "publisher") {
      } else if (user_type == "admin") {
      }
    }
  }
};
</script>
<style scoped>
.login {
  display: flex;
}
.container {
  margin-top: 80px;
  margin-bottom: 80px;
}
.header {
  margin-bottom: 30px;
  border-bottom: 0.5px solid #bababa;
}
.login-wrap {
  border-radius: 15px;
  border: solid 1px gray;
}
.login-header {
  padding: 10px 0px;
  text-align: center;
}
.submit {
  margin-top: 20px;
}
</style>
