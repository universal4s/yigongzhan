<template>
    <div>
        <div>
            <dia-log :Visible="isVisible" @close="open"></dia-log>
        </div>
        <div>
            <div>
                <b-card no-body>
                    <b-tabs pills card>
                        <b-tab title="义工用户" active>
                            <div>
                                <el-table
                                    :data="StuList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                                    :stripe="true"
                                >
                                    <!-- <el-table-column
                                        type="index"
                                        label="序号"
                                        width="60"
                                        align="center"
                                    ></el-table-column>-->
                                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                                    <el-table-column prop="studentId" label="学号" align="center"></el-table-column>
                                    <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                                    <!-- <el-table-column prop="volunteer_age" label="年龄" align="center"></el-table-column> -->
                                    <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                                    <el-table-column prop="college" label="学院" align="center"></el-table-column>
                                    <el-table-column prop="major" label="专业" align="center"></el-table-column>
                                    <el-table-column prop="inYear" label="入学年份" align="center"></el-table-column>
                                    <el-table-column label="操作" width="100">
                                        <template slot-scope="scope">
                                            <div>
                                                <router-link
                                                    :to="{name:'StuDetails',params:{id:scope.row.studentId}}"
                                                >编辑</router-link>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="65px" :show-header="false">
                                        <template slot-scope="scope">
                                            <div>
                                                <el-button
                                                    type="danger"
                                                    @click="open2(scope.row.studentId)"
                                                    icon="el-icon-delete"
                                                    circle
                                                ></el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-button
                                        type="success"
                                        @click="fresh()"
                                        icon="el-icon-refresh"
                                    >刷新</el-button>

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
                        </b-tab>
                        <b-tab title="活动发布者">
                            <publisher-list/>
                        </b-tab>
                        <b-tab title="添加义工">
                            <div>
                                <add-single/>
                            </div>
                            <div>
                                <add-file/>
                                <!-- <el-button type="primary" @click="open()">上传文件</el-button> -->
                            </div>
                        </b-tab>
                        <b-tab title="添加活动发布者">
                            <div>
                                <add-single-teacher/>
                            </div>
                            <div>
                                <add-file/>
                                <!-- <el-button type="primary" @click="open()">上传文件</el-button> -->
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
    </div>
</template>
   
<script>
import { log, error } from "util";
import DiaLog from "./addDialog.vue";
import AddSingle from "./addSingle.vue";
import AddFile from "./uploadFile.vue";
import AddSingleTeacher from "./addSingleTeacher.vue";
import PublisherList from "./publisherList.vue";
import { throws } from "assert";
export default {
    data() {
        return {
            AdminList: [],
            isVisible: false,
            StuList: [],
            currentPage: 1,
            pagesize: 10
        };
    },
    methods: {
        getAdminList() {
            let params = {
                Uid: this.$store.state.UserData.Uid
            };
            this.$axios
                .get(
                    "http://www.overlove.xin/volunteer/public/getstudentinformation"
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.StuList = res.data.data;
                    } else {
                        this.$notify.error({
                            title: "服务异常"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        open() {
            this.isVisible = !this.isVisible;
            console.log(this.isVisible);
        },
        fresh() {
            this.StuList = [];
            this.getAdminList();
        },
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        open2(id) {
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
                                _this.getAdminList();
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
    },
    created() {
        this.getAdminList();
    },
    components: {
        DiaLog,
        AddSingle,
        AddFile,
        AddSingleTeacher,
        PublisherList
    }
};
</script>
<style scoped>
.uni-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>