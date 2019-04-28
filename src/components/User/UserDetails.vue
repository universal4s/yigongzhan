<template>
  <div class="container">
    <span class="badge badge-primary" @click="back">返回</span>
    <div>
      <el-form :model="info_list" label-width="80px">
        <el-form-item label="姓名">
          <el-col :span="8">
            <el-input v-model="info_list.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="学号">
          <el-col :span="8">
            <el-input v-model="info_list.studentId" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-col :span="8">
            <el-input v-model="info_list.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-button @click="btnStyle()" :icon="btnStl"></el-button>
        <el-collapse-transition>
          <div v-show="show">
            <el-form-item label="性别">
              <el-col :span="8">
                <el-input v-model="info_list.sex"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="入学年份">
              <el-col :span="8">
                <el-input v-model="info_list.inYear"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="专业">
              <el-col :span="8">
                <el-input v-model="info_list.major"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="学院">
              <el-col :span="8">
                <el-input v-model="info_list.college" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码">
              <el-col :span="8">
                <el-input v-model="info_list.password"></el-input>
              </el-col>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>
    <el-button type="primary" @click="modify()">修改</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info_list: {},
      show: false,
      btnStl: "el-icon-arrow-down"
    };
  },
  methods: {
    test() {},
    back() {
      this.$router.go(-1);
    },
    getInfo() {
      var _this = this;
      this.$axios
        .get("/volunteer/public/getstudentinformation", {
          params: {
            studentid: _this.$route.params.id
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            _this.info_list = res.data.data[0];
          }
        })
        .catch(err => {});
    },
    modify() {
      let _this = this;
      let fd = new FormData();
      fd.append("studentid", this.info_list.studentId);
      fd.append("sex", this.info_list.sex);
      if (_this.info_list.password !== undefined) {
        fd.append("password", this.info_list.password);
      }
      fd.append("phone", this.info_list.phone);
      fd.append("major", this.info_list.major);
      fd.append("inyear", this.info_list.inYear);
      fd.append("name", this.info_list.name);

      this.$axios
        .post("/volunteer/admin/updatestudent", fd)
        .then(res => {
          if (res.data.code == 200) {
            _this.getInfo();
            _this.$notify.success({
              title: "修改成功"
            });
          } else {
            _this.$notify.error({
              title: "修改失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
          _this.$notify.error({
            title: "修改失败"
          });
        });
    },
    btnStyle() {
      this.show = !this.show;
      console.log(this.btnStl);
      if (this.btnStl === "el-icon-arrow-down") {
        return (this.btnStl = "el-icon-arrow-up");
      } else {
        return (this.btnStl = "el-icon-arrow-down");
      }
    }
  },
  created() {
    this.getInfo();
  }
};
</script>