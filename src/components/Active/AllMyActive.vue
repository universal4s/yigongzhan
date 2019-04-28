<template>
  <div>
    <!-- <b-table striped hover :items="list" :fields="fields">
      <template slot="index" slot-scope="data">{{ data.index+1 }}</template>
      <template slot="actions">
        <b-button size="sm">Info modal</b-button>
      </template>
    </b-table>-->
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
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
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

      <!-- <el-table-column fixed prop="publishTime" label="发布时间" sortable align="center"></el-table-column> -->
      <el-table-column fixed prop="startTime" label="活动时间" sortable align="center"></el-table-column>
      <el-table-column fixed label="操作">
        <template slot-scope="scope">
          <div>
            <router-link :to="{name:'active-details',params:{id:scope.row.id}}">详情</router-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed label="状态" width="100">
        <template slot-scope="scope">
          <div>{{ getSta(scope) }}</div>
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
    <!-- <b-table striped hover :items="list" :fields="fields"></b-table> -->
  </div>
</template>
<script>
import MyActiveDetails from "./MyActiveDetails.vue";
export default {
  data() {
    return {
      fields: ["index", "age", "first_name", "last_name", "actions"],

      list: this.$store.state.AllMyActiveList,
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
      isLoading: true,
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
            _this.list = _this.$store.state.AllMyActiveList = res.data.data.ison.concat(
              res.data.data.overtime
            );
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
    RowClass({ row, index }) {
      if (row.status === 0) {
        return "colora";
      } else {
        return "colorb";
      }
    },
    getSta(x) {
      if (x.row.status == 0) {
        return "正常";
      } else if (x.row.status == 2) {
        return "已取消";
      }
      return "异常";
    }
  },
  created() {
    this.getPersonalActive();
    this.getAlldepart();
    this.getCampus();
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
.el-table .colora {
  background: #b9fabf;
}
.el-table .colorb {
  background: rgb(255, 244, 146);
}
</style>
