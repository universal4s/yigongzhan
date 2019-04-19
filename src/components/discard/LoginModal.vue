<template>
    <div>
        <div
            class="modal fade"
            id="login-modal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
            ref="toggle"
        >
            <div class="modal-dialog narrow-modal" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">注册或者登录</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- 此处设置登陆模块与注册模块 -->
                        <!-- <input type="button" @click="send()" value="发送"> -->
                        <div class="form-group">
                            <label for="user-control">用户名</label>
                            <input
                                type="text"
                                id="user-control"
                                class="form-control"
                                placeholder
                                aria-describedby="helpId"
                                v-model="loginFormData.username"
                                autofocus="autofocus"
                            >
                            <label for="pwd-control">密码</label>
                            <input
                                type="password"
                                id="pwd-control"
                                class="form-control"
                                placeholder
                                aria-describedby="helpId"
                                v-model="loginFormData.pwd"
                                @blur="checkPwd"
                            >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <input
                            type="button"
                            class="btn btn-primary"
                            @click="login()"
                            @keyup.enter="login()"
                            value="登陆"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bus from "./bus.js";
import crypto from "crypto";
import $ from "jquery";

// axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded";

export default {
    name: "LoginModal",
    data() {
        return {
            UserData: {
                Uid: "",
                UserName: "",
                DepartMent: "",
                isSuper: false
            },
            registerFormData: {
                username: "", //用户名
                pwd: "", //密码
                departMent: "" //部门
            },
            loginFormData: {
                username: "T1001503",
                pwd: "123123"
            },
            show: false
        };
    },
    methods: {
        login() {
            let hash = crypto.createHash("md5");
            hash.update(this.loginFormData.pwd);
            let pwd = hash.digest("hex");
            let loginData = {
                username: this.loginFormData.username,
                pwd: this.loginFormData.pwd
            };
            this.$axios
                .post(
                    "https://easy-mock.com/mock/5ca462db5eeed03805bf48f7/yhc/UserLogin",
                    JSON.stringify(loginData)
                )
                .then(Response => {
                    var data = Response.data;

                    localStorage.pwd = this.loginFormData.pwd;
                    localStorage.username = this.loginFormData.username;
                    this.loginFormData.pwd = this.loginFormData.username = "";
                    this.$store.state.UserData = data.UserData;
                    this.$store.state.isLogin = true;
                    // console.log(this.$store.state.UserData);

                    $(this.$refs.toggle).modal("toggle");
                    // ---------动态添加路由-------
                    this.$router.addRoutes(
                        this.getRouterTable(data.UserData.permission)
                    );
                    this.$router.push({ path: "active" });

                    // ----------------
                })
                .catch(function() {
                    console.log("请求失败");
                });
        },
        register() {},
        checkPwd() {
            console.log();
            if (
                this.loginFormData.pwd.length < 8 ||
                this.loginFormData.pwd.length > 16
            ) {
                this.show = !this.show;
                alert("");
            } else {
                this.show = !this.show;
            }
        },
        getRouterTable(type) {
            if (type === "admin") {
                return [
                    {
                        path: "/myActive",
                        component: resolve =>
                            require([`./Active/MyActive.vue`], resolve),
                        meta: {
                            role: ["admin", "superAdmin"]
                        }
                    }
                ];
            } else if (type === "superAdmin") {
                return [
                    {
                        path: "/stuList",
                        component: resolve =>
                            require([`./studentList.vue`], resolve),
                        meta: {
                            role: ["admin", "superAdmin"]
                        }
                    },
                    {
                        path: "/admin",
                        component: resolve => require([`./Admin.vue`], resolve),
                        children: [
                            {
                                path: "",
                                redirect: "uploadFile"
                            },
                            {
                                path: "uploadFile",
                                component: resolve =>
                                    require([
                                        `./adminComponent/uploadFile.vue`
                                    ], resolve)
                            },
                            {
                                path: "addSingle",
                                component: resolve =>
                                    require([
                                        `./adminComponent/addSingle.vue`
                                    ], resolve)
                            }
                        ]
                    },
                    {
                        path: "/myActive",
                        component: resolve =>
                            require([`./Active/MyActive.vue`], resolve),
                        meta: {
                            role: ["admin", "superAdmin"]
                        }
                    },
                    {
                        path: "/admin/details",
                        name: "StuDetails",
                        component: resolve =>
                            require([`./User/UserDetails.vue`], resolve)
                    },
                    {
                        path: "/myActive/active-details",
                        name: "active-details",
                        component: resolve =>
                            require([`./Active/MyActiveDetails.vue`], resolve)
                    },
                    {
                        path: "/user/setting",
                        name: "user-setting",
                        component: resolve =>
                            require([`./User/setting.vue`], resolve)
                    },
                    {
                        path: "/publisher/details",
                        name: "publisherDetails",
                        component: resolve =>
                            require([`./User/publisherDetails.vue`], resolve)
                    },
                ];
            }
        }
    },
    created() {
        if (
            localStorage.username &&
            localStorage.pwd &&
            this.$store.state.auto
        ) {
            let loginData = {
                username: localStorage.username,
                pwd: localStorage.pwd
            };
            this.$axios
                .post(
                    "https://easy-mock.com/mock/5ca462db5eeed03805bf48f7/yhc/UserLogin",
                    JSON.stringify(loginData)
                )
                .then(Response => {
                    var data = Response.data;
                    this.loginFormData.pwd = this.loginFormData.username = "";
                    this.$store.state.UserData = data.UserData;
                    this.$store.state.isLogin = true;
                    this.$router.addRoutes(
                        this.getRouterTable(data.UserData.permission)
                    );
                    this.$router.push({ path: "active" });
                    // ----------------
                })
                .catch(function() {
                    console.log("请求失败");
                });
        }
    }
};
</script>
<style scope>
.narrow-modal {
    width: 380px;
}
</style>