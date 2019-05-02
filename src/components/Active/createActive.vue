<template>
  <div id="create">
    <el-form :model="form" label-width="80px" ref="createActive" :rules="rules">
      <el-form-item label="活动名称" prop="workname">
        <el-col :span="8">
          <el-input v-model="form.workname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="校区" prop="campus">
        <el-col :span="8">
          <el-select v-model="form.campus" placeholder="请选择">
            <el-option
              v-for="item in campus_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="form.department" placeholder="请选择">
          <el-option
            v-for="item in depart_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时长" prop="work_hour">
        <el-input-number v-model="form.work_hour" :precision="1" :step="0.5" :max="2.0" :min="0.5"></el-input-number>
      </el-form-item>
      <el-form-item label="需求人数" prop="neednumber">
        <el-input-number v-model="form.neednumber" :precision="0" :step="1" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="地点" prop="address">
        <el-col :span="8">
          <el-input v-model="form.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="时间" prop="start_time">
        <div class="block">
          <el-date-picker
            v-model="form.start_time"
            type="datetime" 
            placeholder="选择日期时间"
            @change="createDate"
            value-format="yyyy-MM-dd HH:mm:ss.SSS"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="其他" prop="tip">
        <el-col :span="8">
          <el-input v-model="form.tip"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sendForm">提交</el-button>
      </el-form-item>
      <!-- <el-button type="primary" @click="test">ceshi</el-button> -->
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      form: {
        publisher_id: "",
        workname: "",
        campus: "",
        department: "",
        address: "",
        work_hour: "",
        start_time: "",
        neednumber: 1,
        tip: ""
      },
      rules: {
        workname: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 40,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入活动地点",
            trigger: "blur"
          },
          {
            max: 40,
            message: "字符太多",
            trigger: "blur"
          }
        ],
        start_time: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        campus: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change"
          }
        ],
        department: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ]
      },
      depart_list: [],
      depart_selected: null,
      campus_list: [],
      campus_selected: null
    };
  },
  methods: {
    sendForm() {
      this.$refs.createActive.validate(valid => {
        if (valid) {
          this.send();
        } else {
          this.$notify.error({
            title: "请检查数据"
          });
        }
      });
    },
    send() {
      this.form.user_id = this.$store.state.UserData.Uid;
      let fd = new FormData();
      fd.append("publisher_id", this.form.user_id);
      fd.append("workname", this.form.workname);
      //let t = this.form.work_hour;
      //console.log(t+String(t));

      fd.append("work_hour", this.form.work_hour);
      fd.append("address", this.form.address);
      fd.append("start_time", this.form.start_time);
      fd.append("neednumber", this.form.neednumber);
      fd.append("tip", this.form.tip);
      fd.append("campus", this.campus_list[this.form.campus - 1].label);
      fd.append("department", this.depart_list[this.form.department - 1].label);
      this.$axios
        .post("/volunteer/teacher/createactivity", fd)
        .then(res => {
          if (res.data.code == 200) {
            this.$notify.success({
              title: "添加成功"
            });
          } else {
            this.$notify.error({
              title: "活动添加失败"
            });
          }
        })
        .catch(err => {
          console.log(err);

          this.$notify.error({
            title: "活动添加失败"
          });
        });
    },
    formatTime(time) {
      let t = "";
      for (let i = 0; i < 19; i++) {
        if (time[i] === "T") {
          t += " ";
        } else {
          t += time[i];
        }
      }
      return t;
    },
    test() {
      console.log(this.form.work_date);
    },
    createDate(time) {
      this.form.work_date = time;
    },
    getAlldepart() {
      const _this = this;
      _this.depart_list = [];
      _this.$axios
        .get("/volunteer/public/getalldepartment")
        .then(res => {
          // _this.depart_list = res.data;
          for (let item of res.data) {
            _this.depart_list.push({
              value: item.id,
              label: item.departmentName
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCampus() {
      const _this = this;
      _this.depart_list = [];
      _this.$axios
        .get("/volunteer/public/getallcampus")
        .then(res => {
          // _this.depart_list = res.data;
          for (let item of res.data) {
            _this.campus_list.push({
              value: item.id,
              label: item.campusName
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    headers() {
      return {
        "Content-Type": "application/json"
      };
    }
  },
  created() {
    this.getAlldepart();
    this.getCampus();
  }
};
</script>
<style scoped>
#create {
  width: 80%;
  float: left;
  height: auto;
  margin-top: 20px;
}
</style>
