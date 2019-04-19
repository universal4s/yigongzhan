<template>
    <div>
        <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-menu-item index="1">
                <router-link to="/active" class="nav-link a-style a-hover">活动列表</router-link>
            </el-menu-item>
            <el-menu-item
                index="2"
                v-if="this.$store.state.UserData.permission==='superAdmin'||this.$store.state.UserData.permission==='admin'"
            >
                <router-link to="/myActive" class="nav-link a-style a-hover">我的活动</router-link>
            </el-menu-item>
            <el-menu-item index="3" v-if="this.$store.state.UserData.permission === 'superAdmin'">
                <router-link to="/admin" class="nav-link a-style a-hover">用户管理</router-link>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.a-style {
    text-decoration: none;
    color: #343a40;
}
.a-hover:hover {
    color: black;
}
</style>