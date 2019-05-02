<template>
  <div class="ce-wrapper">
    <b-form inline>
      <!-- <label class="sr-only" for="inline-form-input-name">Name</label>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe"></b-input>

      <label class="sr-only" for="inline-form-input-username">Username</label>
      <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inline-form-input-username" placeholder="Username"></b-input>
      </b-input-group>

      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>-->
      <b-form-select v-model="campus_selected" :options="campus_list" class="left">
        <template slot="first">
          <option :value="null" disabled>选择校区</option>
        </template>
      </b-form-select>
      <b-form-select v-model="depart_selected" :options="depart_list" class="left">
        <template slot="first">
          <option :value="null" disabled>选择部门</option>
        </template>
      </b-form-select>

      <b-button variant="primary" class="left" @click="getPersonalActive">查找</b-button>
      <b-button variant="primary" @click="reset()" class="left">重置</b-button>
    </b-form>
    <el-table
      :data="getdata()"
      v-loading="isLoading"
      :default-sort="{prop: 'startTime', order: 'descending'}"
      :row-class-name="RowClass"
    >
      <el-table-column fixed prop="name" label="活动名称" align="center" width="100"></el-table-column>
      <el-table-column fixed prop="workHour" label="工时" align="center" width="80"></el-table-column>
      <el-table-column fixed prop="attendNum" label="已签" align="center" width="80"></el-table-column>
      <el-table-column fixed prop="needNum" label="需要" align="center" width="80"></el-table-column>
      <el-table-column fixed prop="workAddr" label="地点" align="center"></el-table-column>
      <el-table-column fixed prop="workCampus" label="校区" align="center"></el-table-column>
      <el-table-column fixed prop="workDepartment" label="部门" align="center"></el-table-column>
      <el-table-column fixed prop="startTime" label="活动时间" sortable align="center"></el-table-column>
      <el-table-column fixed label="状态" width="100">
        <template slot-scope="scope">
          <div>{{ getSta(scope) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <router-link :to="{name:'active-details',params:{id:scope.row.id}}">详情</router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" @click="fresh()" icon="el-icon-refresh">刷新</el-button>
    <div class="block">
      <el-pagination
        class="cen"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="list.length"
        background
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MyActiveDetails from "./MyActiveDetails.vue";
export default {
  data() {
    return {
      fields: ["index", "age", "first_name", "last_name", "actions"],

      list: [
        // {
        //   attendNum: 1,
        //   id: 19,
        //   name: "测试2",
        //   needNum: 12,
        //   publishTime: "2019-04-20 16:03:06",
        //   publisherId: 162210702234,
        //   startTime: "2019-04-30 00:00:00",
        //   status: 0,
        //   workAddr: "图书馆二楼",
        //   workCampus: "西校区",
        //   workDepartment: "图书馆",
        //   workHour: 0.5,
        //   workTip: "附加"
        // }
      ],
      fields: [
        {
          key: "name",
          label: "活动名称"
        },
        {
          key: "workHour",
          label: "工时"
        },
        {
          key: "needNum",
          label: "需要人数"
        },
        {
          key: "attendNum",
          label: "已预约人数"
        },
        {
          key: "startTime",
          label: "开始时间"
        },
        {
          key: "workAddr",
          label: "活动地点"
        },
        {
          key: "workCampus",
          label: "校区"
        },
        {
          key: "workDepartment",
          label: "部门"
        },
        {
          key: "workTip",
          label: "活动要求"
        }
      ],
      isLoading: false,
      currentPage: 1,
      pagesize: 10,
      depart_list: [],
      depart_selected: null,
      campus_list: [],
      campus_selected: null
    };
  },
  methods: {
    getPersonalActive() {
      this.isLoading = true;
      var _this = this;
      let data = {};
      data.publisherid = _this.$store.state.UserData.Uid;
      if (_this.depart_selected != null) {
        data.department = this.depart_list[this.depart_selected - 1].text;
      }
      if (_this.campus_selected != null) {
        console.log(this.campus_list[this.campus_selected - 1].text);

        data.campus = this.campus_list[this.campus_selected - 1].text;
      }
      this.$axios
        .get("/volunteer/teacher/getallworkbyteacherid", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data.ison.concat(res.data.data.overtime);
            _this.isLoading = false;
          } else {
            _this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          _this.isLoading = !_this.isLoading;
        });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    fresh() {
      this.getPersonalActive();
    },
    sovle_time(time) {
      return time.substring(4);
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
              text: item.departmentName
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
              text: item.campusName
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      this.campus_selected = null;
      this.depart_selected = null;
      this.getPersonalActive();
    },
    RowClass(row) {
      if (row.row.status == 0) {
        return "colorc";
      }
      return "colord";
    },
    getSta(x) {
      if (x.row.status == 0) {
        return "正常";
      } else if (x.row.status == 2) {
        return "已取消";
      }
      return "异常";
    },
    getdata() {
      var list = this.list.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      return list;
    }
  },
  created() {
    this.getAlldepart();
    this.getCampus();
    this.getPersonalActive();
  },
  components: {
    MyActiveDetails
  }
};
</script>
<style scoped>
.left {
  /* margin: 10px; */
  margin-left: 10px;
}
.el-table .colorc {
  background: #b9fabf;
}
.el-table .colord {
  background: rgb(255, 244, 146);
}
.block {
  display: flex;
  justify-content: center;
}
</style>
