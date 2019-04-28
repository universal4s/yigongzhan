<template>
    <div>
        <el-table
            :data="publisherList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :stripe="true"
        >
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="publisherId" label="工号" align="center"></el-table-column>
            <!-- <el-table-column prop="sex" label="性别" align="center"></el-table-column> -->
            <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="location" label="地点" align="center"></el-table-column>

            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <div>
                        <router-link
                            :to="{name:'publisherDetails',params:{id:scope.row.publisherId}}"
                        >详情</router-link>
                    </div>
                </template>
            </el-table-column>
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
            <el-button type="success" @click="fresh()" icon="el-icon-refresh">刷新</el-button>

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
    </div>
</template>
<script>
export default {
    data() {
        return {
            publisherList: [],
            currentPage: 1,
            pagesize: 10
        };
    },
    methods: {
        getPublisherList() {
            var _this = this;
            _this.$axios
                .get("/volunteer/admin/getallpublisher")
                .then(res => {
                    if (res.data.code == 200) {
                        _this.publisherList = res.data.data;
                        _this.$store.state.publisherList = _this.publisherList;
                    }
                    // console.log(_this.publisherList);
                })
                .catch(err => {
                    console.log(err);
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
        }
    },
    created() {
        this.getPublisherList();
    }
};
</script>