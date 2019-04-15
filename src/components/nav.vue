<template>
    <div>
        <nav class="navbar navbar-expand-x navbar-light bg-light">
            <a class="navbar-brand">
                <img
                    src="../img/logo.svg"
                    width="30"
                    height="30"
                    class="d-inline-block align-top"
                    alt
                >
                萤火虫义工站
            </a>

            <!-- 学业指导 -->
            <!-- 心理咨询 -->
            <form class="form-inline" v-if="!this.$store.state.isLogin">
                <input
                    type="button"
                    class="btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#login-modal"
                    value="登陆"
                >
            </form>
            <form class="form-inline" v-if="this.$store.state.isLogin">
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span>{{ this.$store.state.UserData.UserName}}</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" @click="exit()">退出</a>
                        <a class="dropdown-item" @click="setting()">设置</a>
                    </div>
                </div>
            </form>
        </nav>
        <login-modal></login-modal>
        <b-modal ref="setting" hide-footer title="Using Component Methods">
            <div class="d-block text-center">
                <h3>Hello From My Modal!</h3>
            </div>
            <b-button class="mt-3" variant="outline-danger" block >Close Me</b-button>
            <b-button class="mt-2" variant="outline-warning" block >Toggle Me</b-button>
        </b-modal>
    </div>
</template>
<script>
import crypto from "crypto";
import LoginModal from "./LoginModal.vue";
export default {
    name: "nav-bar",
    data() {
        return {
            msg: ""
        };
    },
    methods: {
        check() {
            //console.log("正在输入");
        },
        exit() {
            localStorage.username = "";
            localStorage.pwd = "";
            // console.log(1);

            this.$router.go(0);
            this.$router.replace({ path: "/active" });
        },
        setting(){
            // this.$refs['setting'].show()
            // this.$router.go(0);
            this.$router.push({ path: "/user/setting" });
        }

    },
    components: {
        LoginModal
    }
};
</script>
