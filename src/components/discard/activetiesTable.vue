<template>
    <div>
        <div>
            <el-input
                placeholder="查找活动"
                prefix-icon="el-icon-search"
                v-model="keyWords"
                autofocus="true"
                style="width:300px"
            ></el-input>
            <input type="button" value="刷新" class="btn btn-primary" @click="getActivitiesTabel"/>
        </div>
        <div>
            <el-table
                :data="search(keyWords)"
                v-loading="isLoading"
                :default-sort="{prop: 'startTime', order: 'descending'}"
            >
                <!-- <el-table-column fixed label="序号" align="center" width="50">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
                </el-table-column>-->
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed prop="name" label="活动名称" align="center" width="100"></el-table-column>
                <el-table-column
                    fixed
                    prop="workHour"
                    label="工时"
                    sortable
                    align="center"
                    width="85"
                ></el-table-column>
                <el-table-column
                    fixed
                    prop="attendNum"
                    label="已预约"
                    sortable
                    align="center"
                    width="90"
                ></el-table-column>
                <el-table-column fixed prop="needNum" label="需要" sortable align="center" width="80"></el-table-column>
                <el-table-column fixed prop="workCampus" label="校区" align="center" width="80"></el-table-column>
                <el-table-column fixed prop="workDepartment" label="部门" align="center" width="100"></el-table-column>
                <el-table-column fixed prop="workAddr" label="地点" align="center"></el-table-column>
                <el-table-column fixed prop="publishTime" label="发布时间" sortable align="center"></el-table-column>
                <el-table-column fixed prop="startTime" label="开始时间" sortable align="center"></el-table-column>
                <el-table-column fixed prop="publisherId" label="发布人" align="center"></el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                class="cen"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pagesize"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="activeList.length"
                background
            ></el-pagination>
        </div>
    </div>
</template>
<script>
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
// import bus from "./bus.js";
// import { sha512, saltHashPassword } from "../js/encrypt.js";
// import Noti from "./Notification.vue";
export default {
    name: "activitiesTable",
    data() {
        return {
            keyWords: "",
            activeList: [],
            isLoading: true,
            currentPage: 1,
            pagesize: 10
        };
    },
    methods: {
        exportExcel(filename) {
            let wb = XLSX.utils.table_to_book(this.$refs.activeTable);
            let wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
            });
            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: "application/octet-stream" }),
                    filename + ".xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
        },
        getActivitiesTabel() {
            // setTimeout(() => {
            //     this.isLoading = false;
            // }, 3000);
            this.activeList = [];
            //获取活动列表
            // this.$axios
            //     .get("https://easy-mock.com/mock/5ca462db5eeed03805bf48f7/yhc/unfinishedworks")
            //     .then(Response => {
            //         if (Response.data.error_code === 0) {
            //             this.activeList = Response.data.unfinishedworks;
            //             this.isLoading = false;
            //         }
            //         else {
            //             throw new Error("未完成活动获取失败")
            //         }
            //     })
            //     .catch(function(err) {
            //         this.isLoading = false;
            //         console.log(err);
            //     });
            var _this = this;
            this.$axios
                .get(
                    "http://www.overlove.xin/volunteer/public/getworkinformation"
                )
                .then(res => {
                    if (res.data.code == "200") {
                        this.activeList = res.data.data.ison;
                        _this.isLoading = false;
                        // console.log(this.activeList);

                        for (var i = 0; i < this.activeList.length; i++) {
                            this.activeList[i].publishTime = this.activeList[
                                i
                            ].publishTime.substring(5);
                            this.activeList[i].startTime = this.activeList[
                                i
                            ].startTime.substring(5);
                        }
                    } else {
                        throw new Error("未完成活动获取失败");
                    }
                })
                .catch(function(err) {
                    _this.isLoading = false;
                    console.log(err);
                });
        },
        searchStu() {
            alert(this.keyWords);
        },
        search(keyWords) {
            let list = [];
            this.activeList.forEach(ele => {
                if (
                    ele.name.includes(keyWords) ||
                    ele.workAddr.includes(keyWords)
                ) {
                    list.push(ele);
                }
            });

            return list.slice(
                (this.currentPage - 1) * this.pagesize,
                this.currentPage * this.pagesize
            );
        },
        test(index) {
            this.$store.commit("change");
            // console.log(saltHashPassword("534443403"));
            // console.log(sha512("534443403","6c9739c72e08e097"));
            //c54dfe2e74e17d04eb3de9f9e34031054082da7cbaf748ba045b1d408d4da158f4f4e3de0785674a5fd5aa958de4aea1b0df7ec674360ca7ac62a29ca2d7ff37
        },
        deleteRow(index) {
            this.activeList.splice(index, 1);
        },
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        }
    },
    created() {
        this.getActivitiesTabel();
        this.search(null);
        bus.$on("getList", data => {
            this.getActivitiesTabel();
            this.search(null);
        });
    },
    components: {
        // Noti
    }
};
</script>
<style scope>
th {
    text-align: center; /** 设置水平方向居中 */
    vertical-align: middle; /** 设置垂直方向居中 */
}
.bold {
    font-weight: bold;
}
.cen {
    text-align: center;
    margin-top: 30px;
}
</style>