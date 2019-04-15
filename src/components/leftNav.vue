<template>
    <span class="border border-light rounded" id="leftNav">
        <ul class="nav flex-column nav-pills" align="center">
            <li class="nav-item">
                <!-- <router-link v-on:click.native="test()" to="/main/active" class="nav-link">活动列表</router-link> -->
                <router-link to="/active" class="nav-link a-style a-hover">活动列表</router-link>
            </li>
            <li
                class="nav-item"
                v-if="this.$store.state.UserData.permission==='superAdmin'||this.$store.state.UserData.permission==='admin'"
            >
                <router-link to="/myActive" class="nav-link a-style a-hover">我的活动</router-link>
            </li>
            <!-- <li class="nav-item" v-if="this.$store.state.UserData.permission === 'superAdmin'">
                <router-link to="/stuList" class="nav-link a-style a-hover">学生查看</router-link>
            </li>-->
            <li class="nav-item" v-if="this.$store.state.UserData.permission === 'superAdmin'">
                <router-link to="/admin" class="nav-link a-style a-hover">用户管理</router-link>
            </li>
            <!-- <input type="button" value="测试isSuper" @click="test()"> -->
        </ul>
    </span>
</template>
<script>
import bus from "./bus.js";

export default {
    data() {
        return {};
    },
    methods: {
        test() {
            console.log(this.$store.state.UserData.permission);
        }
    }
};
</script>
<style scope>

.a-style {
    text-decoration: none;
    color: #343a40;
}
.a-hover:hover {
    color: black;
}
</style>