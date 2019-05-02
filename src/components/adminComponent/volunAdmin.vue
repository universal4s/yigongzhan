<template >
  <div>
    <div>
      <el-table
        id="volun_data"
        :data="StuList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :stripe="true"
        v-loading="isLoading"
      >
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="studentId" label="学号" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <!-- <el-table-column prop="volunteer_age" label="年龄" align="center"></el-table-column> -->
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="college" label="学院" align="center"></el-table-column>
        <el-table-column prop="major" label="专业" align="center"></el-table-column>
        <el-table-column prop="inYear" label="入学年份" align="center"></el-table-column>
        <!-- <el-table-column prop="gs"></el-table-column> -->
        <el-table-column width="80" :show-header="false">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                @click="edit_volun(scope.row.studentId)"
                icon="el-icon-edit"
              ></el-button>
              <!-- <router-link :to="{name:'StuDetails',params:{id:scope.row.studentId}}" tag="span">编辑</router-link> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column width="80" :show-header="false">
          <template slot-scope="scope">
            <div>
              <el-button
                type="danger"
                @click="delete_volun(scope.row.studentId)"
                icon="el-icon-delete"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block partition">
        <el-pagination
          class="cen"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="StuList.length"
          background
        ></el-pagination>
      </div>
    </div>
    <el-button @click="fresh()" icon="el-icon-refresh">刷新</el-button>
    <el-button @click="add()" type="success" icon="el-icon-plus">用户添加</el-button>
    <el-button type="success" @click="ExportExcel">导出</el-button>
  </div>
</template>
<script>
import xlsx from "xlsx";
import filesaver from "file-saver";
export default {
  components: {},
  data() {
    return {
      StuList: [],
      currentPage: 1,
      pagesize: 10,
      isLoading: false
    };
  },
  methods: {
    getVolun() {
      this.isLoading = true;
      let params = {
        Uid: this.$store.state.UserData.Uid
      };
      this.$axios
        .get("/volunteer/public/getstudentinformation")
        .then(res => {
          if (res.data.code == 200) {
            this.StuList = res.data.data;
            this.isLoading = false;
          } else {
            this.$notify.error({
              title: "服务异常"
            });
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    delete_volun(id) {
      var _this = this;
      this.$confirm("此操作将永久删除该义工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("studentid", id);
          _this.$axios
            .post("/volunteer/admin/deletestudentuser", fd)
            .then(res => {
              if (res.data.code == 200) {
                _this.getVolun();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
                throw new Error("删除失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit_volun(id) {
      this.$router.push({
        name: "StuDetails",
        params: { id: id }
      });
    },
    fresh() {
      this.StuList = [];
      this.getVolun();
    },
    add() {
      this.$router.push({ name: "add-volun" });
    },
    ExportExcel() {
      this.pagesize = 99999999;
      this.currentPage = 1;
      this.$nextTick(() => {
        let box = xlsx.utils.table_to_book(
          document.querySelector("#volun_data"),
          { raw: true }
        );
        let out = xlsx.write(box, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          filesaver.saveAs(
            new Blob([out], {
              type: "application/octet-stream"
            }),
            "volunteer.xlsx"
          );
        } catch (e) {
          console.log("导出出错");
        }
        this.pagesize = 10;
        return out;
      });
    }
  },
  created() {
    this.getVolun();
  }
};
</script>
<style scoped>
.block {
  display: flex;
  justify-content: center;
}
</style>
