<template>
    <div>
        <span class="badge badge-primary" @click="back">返回</span>
        <div style="width:25%">
            <el-form :model="info_list" label-width="80px">
                <el-form-item label="姓名" size="small">
                    <el-input v-model="info_list.name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="工号" size="small">
                    <el-input v-model="info_list.publisherId" size="small"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="info_list.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="info_list.location"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" @click="modify()">修改</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            info_list: {},
            show: false,
            btnStl: "el-icon-arrow-down"
        };
    },
    methods: {
        test() {},
        back() {
            this.$router.go(-1);
        },
        getInfo() {
            var _this = this;
            _this.$store.state.publisherList.some(ele => {
                if (ele.publisherId == _this.$route.params.id) {
                    _this.info_list = ele;
                    console.log(ele);

                    return;
                }
            });
            // this.$axios
            //     .get("/volunteer/public/getstudentinformation", {
            //         params: {
            //             studentid: _this.$route.params.id
            //         }
            //     })
            //     .then(res => {
            //         if (res.data.code == 200) {
            //             _this.info_list = res.data.data[0];
            //         }
            //     })
            //     .catch(err => {});
        },
        modify() {
            var _this = this;
            let fd = new FormData();
            fd.append("publisherid", _this.$route.params.id);
            fd.append("name", this.info_list.name);
            if(this.info_list.password!=undefined){
                fd.append("password", this.info_list.password);
            }
            fd.append("phone", this.info_list.phone);
            fd.append("location", this.info_list.location);
            this.$axios
                .post("/volunteer/admin/updatepublisher", fd)
                .then(res => {
                    if (res.data.code == 200) {
                        _this.$notify.success({
                            title: "修改成功"
                        });
                    } else {
                        _this.$notify.error({
                            title: "修改失败"
                        });
                    }
                })
                .catch(err => {
                    _this.$notify.error({
                        title: "修改失败"
                    });
                    console.log(err);
                });
        },
        btnStyle() {
            this.show = !this.show;
            console.log(this.btnStl);

            if (this.btnStl === "el-icon-arrow-down") {
                return (this.btnStl = "el-icon-arrow-up");
            } else {
                return (this.btnStl = "el-icon-arrow-down");
            }
        }
    },
    created() {
        this.getInfo();
    }
};
</script>
<style scoped>

</style>
