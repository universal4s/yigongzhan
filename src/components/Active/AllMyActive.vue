<template>
    <div>
        <el-button type="success" @click="fresh()" icon="el-icon-refresh">刷新</el-button>

        <el-table
            :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            v-loading="isLoading"
            :default-sort="{prop: 'startTime', order: 'descending'}"
        >
            <el-table-column fixed prop="name" label="活动名称" align="center" width="100"></el-table-column>
            <el-table-column fixed prop="workHour" label="工时" sortable align="center" width="120"></el-table-column>
            <el-table-column fixed prop="attendNum" label="已预约" sortable align="center"></el-table-column>
            <el-table-column fixed prop="needNum" label="需要" sortable align="center"></el-table-column>

            <el-table-column fixed prop="workAddr" label="地点" align="center"></el-table-column>
            <el-table-column fixed prop="workCampus" label="校区" align="center"></el-table-column>
            <el-table-column fixed prop="workDepartment" label="部门" align="center"></el-table-column>

            <!-- <el-table-column fixed prop="signup_num" label="已注册" align="center"></el-table-column> -->
            <el-table-column fixed prop="publishTime" label="发布时间" sortable align="center"></el-table-column>
            <el-table-column fixed prop="startTime" label="开始时间" sortable align="center"></el-table-column>

            <!-- <el-table-column fixed prop="teacher_name" label="发布人" align="center"></el-table-column> -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div>
                        <router-link :to="{name:'active-details',params:{id:scope.row.id}}">详情</router-link>
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
            list: this.$store.state.AllMyActiveList,
            isLoading: true,
            currentPage: 1,
            pagesize: 10
        };
    },
    methods: {
        getPersonalActive() {
            // this.$axios
            //     .get("https://easy-mock.com/mock/5ca462db5eeed03805bf48f7/yhc/showAllMyCreatedWorks", {
            //         params: {
            //             user_id: this.$store.state.UserData.Uid
            //         }
            //     })
            //     .then(res => {
            //         if (res.data.exe_result) {
            //             this.list = res.data.mycreatedworks;
            //             this.list.sort((a,b)=>a.work_date>b.work_date)
            //             console.log(this.list);

            //             this.isLoading = false;
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         this.isLoading = !this.isLoading;
            //     });
            var _this = this;
            this.$axios
                .get(
                    "http://www.overlove.xin/volunteer/teacher/getallworkbyteacherid",
                    {
                        params: {
                            publisherid: this.$store.state.UserData.Uid
                        }
                    }
                )
                .then(res => {
                    if (res.data.code == 200) {
                        _this.list = _this.$store.state.AllMyActiveList =
                            res.data.data.ison.concat(res.data.data.overtime);
                        // console.log(_this.$store.state.AllMyActiveList);
                        // console.log(_this.list);

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
        fresh(){
            this.getPersonalActive();
        },
    },
    created() {
        this.getPersonalActive();
    },
    components: {
        MyActiveDetails
    }
};
</script>