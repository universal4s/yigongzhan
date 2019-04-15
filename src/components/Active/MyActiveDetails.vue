<template>
    <div>
        <span @click="back" class="badge badge-primary">返回</span>
        <!-- <p>{{ this.$route.params.work_no }}</p> -->
        <!-- <input type="button" value="测试" @click="test"> -->
        <!-- <p align="center">活动内容的修改</p> -->
        <!-- <p align="center">活动具体详情，包括注册人数</p> -->

        <div class="box">
            <div>
                <el-form :model="work_info" ref="modifu_form" label-width="80px">
                    <el-form-item label="活动名称">
                        <el-col>
                            <el-input v-model="work_info.name" :disabled="isCor"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="活动地点">
                        <el-col>
                            <el-input v-model="work_info.workDepartment" :disabled="isCor"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="时长" prop="work_hour">
                        <el-input-number
                            v-model="work_info.workHour"
                            :precision="1"
                            :step="0.5"
                            :max="2.5"
                            :min="0.5"
                            :disabled="isCor"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="需求人数" prop="neednumber">
                        <el-col>
                            <el-input-number
                                v-model="work_info.needNum"
                                :precision="0"
                                :step="1"
                                :min="1"
                                :disabled="isCor"
                            ></el-input-number>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="start_time">
                        <div class="block">
                            <el-date-picker
                                v-model="work_info.startTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                :disabled="isCor"
                            ></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="校区">
                        <el-col>
                            <el-input v-model="work_info.workCampus" :disabled="isCor"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-col>
                            <el-input v-model="work_info.workDepartment" :disabled="isCor"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="modify()" :disabled="isCor">修改</el-button>
                        <!-- <el-button>取消</el-button> -->
                        <el-button type="danger" @click="Delete()">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div style="padding-left:50px;">
                <!-- <b-button variant="success">Button</b-button> -->

                <el-table :data="solveInfo()" border :row-class-name="rowClass">
                    <el-table-column prop="studentName" label="姓名" width="150px" align="center"></el-table-column>
                    <el-table-column prop="studentId" label="学号" width="150px" align="center"></el-table-column>
                    <el-table-column prop="isfinished" label="是否完成" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="sign(scope.row.studentId,scope.row.studentName)"
                                v-if="scope.row.isfinished==='否' "
                            >签到</el-button>
                            <el-button type="success" icon="el-icon-check" circle v-else></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- <el-table
            :data="stulist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            v-loading="isLoading"
        >
            <el-table-column fixed prop="volunteer_name" label="姓名" align="center"></el-table-column>
            <el-table-column fixed prop="volunteer_id" label="学号" sortable align="center"></el-table-column>
            <el-table-column fixed prop="volunteer_gender" label="性别" sortable align="center"></el-table-column>
            <el-table-column fixed="right" label="签到" width="120">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="sign(scope.row.volunteer_id)"
                        type="primary"
                        size="small"
                    >签到</el-button>
                </template>
            </el-table-column>
        </el-table>-->
        <!-- <div class="block">
            <el-pagination
                class="cen"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pagesize"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="stulist.length"
                background
            ></el-pagination>
        </div>-->
    </div>
</template>
<script>
import { formatDate } from "../../js/date.js";
export default {
    data() {
        return {
            stulist: [],
            work_info: [],
            isLoading: true,
            currentPage: 1,
            pagesize: 10,
            isCor: true
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        getWorkDetails() {
            var _this = this;
            this.$store.state.AllMyActiveList.forEach(ele => {
                if (ele.id == this.$route.params.id) {
                    _this.work_info = ele;
                    // console.log(_this.work_info);
                    _this.isCorrect(_this.work_info.startTime);
                    _this.work_info.startTime = new Date(
                        _this.work_info.startTime
                    );
                    console.log(ele);

                    return;
                }
            });
            // this.$axios
            //     .get("/api/v1.1/showWorkInfo", {
            //         params: {
            //             user_id: this.$store.state.UserData.Uid,
            //             work_no: this.$route.params.id
            //         }
            //     })
            //     .then(res => {
            //         if (res.data.exe_result) {
            //             this.work_info = res.data.work_info;
            //             this.stulist = res.data.signup_info;
            //             console.log(this.work_info);
            //             console.log(this.stulist);
            //             console.log(1);
            //             this.isLoading = false;
            //         }
            //     });
        },
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        formatTime(time) {
            return formatDate(time, "yyyy-MM-dd hh:mm");
        },
        createDate(time) {
            // this.work_info.startTime = time;
        },
        sign(stu_id, name) {
            console.log(stu_id,name);
            
            var _this = this;
            let fd = new FormData();
            fd.append("workid", _this.work_info.id);
            fd.append("publisherid", _this.work_info.publisherId);
            fd.append("studentid", stu_id);

            _this.$axios
                .post("/volunteer/teacher/checkactivity", fd)
                .then(res => {
                    if (res.data.code == 200) {
                        _this.$notify.success({
                            title: `'${name} 签到成功'`
                        });
                        _this.getStulist();
                    } else {
                        _this.$notify.error({
                            title: res.data.msg
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // this.$axios
            //     .post(
            //         "https://easy-mock.com/mock/5ca462db5eeed03805bf48f7/yhc/registAttendance",
            //         {
            //             user_id: this.$store.state.UserData.Uid,
            //             work_no: this.$route.params.work_no,
            //             volunteer_id_list: [stu_id]
            //         }
            //     )
            //     .then(res => {
            //         if (res.data.exe_result === true) {
            //             // alert("签到成功");
            //             this.$notify({
            //                 title: "成功",
            //                 message: `${name} 签到成功`,
            //                 type: "success"
            //             });
            //         } else {
            //             // alert("签到失败");
            //             this.$notify({
            //                 title: "失败",
            //                 message: `${stu_id} 签到失败`,
            //                 type: "error"
            //             });
            //         }
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         this.$notify({
            //             title: "失败",
            //             message: `${stu_id} 签到失败`,
            //             type: "error"
            //         });
            //         console.log(err);
            //     });
        },
        modify() {
            var _this = this;
            let fd = new FormData();
            fd.append("id", _this.work_info.id);
            fd.append("workname", _this.work_info.name);
            fd.append("campus", _this.work_info.workCampus);
            fd.append("department", _this.work_info.workDepartment);
            fd.append("address", _this.work_info.workAddr);
            fd.append("work_hour", _this.work_info.workHour);
            fd.append("neednumber", _this.work_info.needNum);
            fd.append(
                "start_time",
                _this.formatTime(_this.work_info.startTime)
            );

            _this.$axios
                .post("/volunteer/teacher/updateactivity", fd)
                .then(res => {
                    if (res.data.code == 200) {
                        // _this.work_info = res.data.data;
                        _this.UpdataInfo();
                        this.$notify.success({
                            title: "修改活动信息成功"
                        });
                    } else {
                        this.$notify.error({
                            title: "修改失败"
                        });
                    }
                })
                .catch(err => {
                    _this.UpdataInfo();

                    console.log(err);
                    this.$notify.error({
                        title: "修改失败"
                    });
                });
        },
        UpdataInfo() {
            var _this = this;
            _this.$axios
                .get(
                    "http://www.overlove.xin/volunteer/public/getworkinformation",
                    {
                        params: {
                            id: _this.work_info.id
                        }
                    }
                )
                .then(res => {
                    if (res.data.code == 200) {
                        _this.work_info = res.data.data.ison[0];
                    } else {
                        new error("操作失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getStulist() {
            var _this = this;
            _this.$axios
                .get("/volunteer/public/getworkattendbyworkid", {
                    params: {
                        workid: this.$route.params.id
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.stulist = res.data.data;
                    } else {
                        _this.$notify.error({
                            title: "服务器数据异常"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        solveInfo() {
            var nlist = [];
            var t;
            nlist = this.stulist;
            nlist.forEach(ele => {
                if (ele.isfinished === false) {
                    ele.isfinished = "否";
                } else if (ele.isfinished === true) {
                    ele.isfinished = "是";
                }
                // ele.startTime = ;
            });

            return nlist;
        },
        rowClass(row) {
            // console.log(row.row);
            if (row.row.isfinished === "否") {
                // console.log("fou");

                return "colorb";
            } else {
                return "colora";
            }
        },
        isCorrect(t) {
            let tt = new Date(Date.parse(new Date()) + 480 * 60 * 1000);
            let p = new Date(t);
            this.isCor = tt > p;
        },
        Delete(id) {
            var _this = this;
            this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let fd = new FormData();
                    fd.append("id", _this.work_info.id);
                    fd.append("publisherid", _this.work_info.publisherId);
                    _this.$axios
                        .post("/volunteer/teacher/deleteactivity", fd)
                        .then(res => {
                            if (res.data.code == "200") {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                _this.$router.go(-1);
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
        this.getWorkDetails();
        this.getStulist();
    }
};
</script>
<style scope>
.box {
    display: flex;
}
.el-table .colora {
    background: #b9fabf;
}
.el-table .colorb {
    background: rgb(255, 244, 146);
}
</style>
