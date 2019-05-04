<template>
  <div>
    <el-table
      :data="publisherList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :stripe="true"
      v-loading="isLoading"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="publisherId" label="工号" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="location" label="地点" align="center"></el-table-column>
      <el-table-column width="80" :show-header="false">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              @click="edit_volun(scope.row.publisherId)"
              icon="el-icon-edit"
            ></el-button>
            <!-- <router-link :to="{name:'StuDetails',params:{id:scope.row.studentId}}" tag="span">编辑</router-link> -->
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <router-link :to="{name:'PubDetails',params:{id:scope.row.publisherId}}">详情</router-link>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column width="65px" :show-header="false">
        <template slot-scope="scope">
          <div>
            <el-button
              type="danger"
              @click="open(scope.row.publisherId)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        class="cen"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="publisherList.length"
        background
      ></el-pagination>
    </div>
    <el-button @click="fresh()" icon="el-icon-refresh">刷新</el-button>
    <el-button @click="add()" type="success" icon="el-icon-plus">用户添加</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      publisherList: [],
      currentPage: 1,
      pagesize: 10,
      isLoading: false
    };
  },
  methods: {
    getPublisherList() {
      this.isLoading = true;
      var _this = this;
      _this.$axios
        .get("/volunteer/admin/getallpublisher")
        .then(res => {
          if (res.data.code == 200) {
            _this.publisherList = res.data.data;
            _this.$store.state.publisherList = _this.publisherList;
          }
          this.isLoading = false;

          // console.log(_this.publisherList);
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
    fresh() {
      this.publisherList = [];
      this.getPublisherList();
    },
    open(id) {
      var _this = this;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("publisherid", id);
          _this.$axios
            .post("/volunteer/admin/deletepublisher", fd)
            .then(res => {
              if (res.data.code == 200) {
                _this.getPublisherList();
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
    add() {
      this.$router.push({ name: "add-public",params:{
        type:"pub"
      } });
    },
    edit_volun(id) {
      this.$router.push({
        name: "PubDetails",
        params: { id: id }
      });
    }
  },
  created() {
    this.getPublisherList();
  }
};
</script>
<style scoped>
.block {
  display: flex;
  justify-content: center;
}
</style>
