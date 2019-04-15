<template>
    <div>
                    <div>
                        <admin-list></admin-list>
                    </div>
        <!-- <el-tabs type="card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->
                <!-- <el-tab-pane label="角色管理" name="second">
                    
                </el-tab-pane>
            </el-tabs> -->
        <!-- </el-tabs> --> -->
    </div>
</template>
<script>
import AdminList from './adminComponent/UserList.vue'
export default {
    name: "SetAdmin",
    data() {
        return {
            activeName: "first"
        };
    },
    components:{
        AdminList
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    }
};
</script>
<style scope>
</style>