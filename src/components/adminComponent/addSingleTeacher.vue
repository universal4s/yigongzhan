<template>
    <div class="container">
        <el-form :model="form" label-width="80px" :rules="rules" ref="addUserForm">
            <el-form-item label="职工号" prop="publisherid" size="small">
                <el-col :span="8">
                    <el-input v-model="form.publisherid"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="name" size="medium ">
                <el-col :span="8">
                    <el-input v-model="form.name">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password" size="small">
                <el-col :span="8">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone" size="small">
                <el-col :span="8">
                    <el-input v-model="form.phone"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="住址" prop="location" size="small">
                <el-col :span="8">
                    <el-input v-model="form.location"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('addUserForm')">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                publisherid: "",
                password:"",
                name: "",
                phone: "",
                location: ""

            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入用户姓名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 2 到 20 个字符",
                        trigger: "blur"
                    }
                ],
                publisherid: [
                    {
                        required: true,
                        message: "请输入用户教工号",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 12,
                        message: "长度为 12 ",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入教工电话号码",
                        trigger: "blur"
                    }
                ],
                location: [
                    {
                        required: true,
                        message: "请输入用户住址",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.sendForm();
                } else {
                    console.log("表单数据异常");
                    return false;
                }
            });
        },
        sendForm() {
            let fd= new FormData();
            fd.append("publisherid",this.form.publisherid);
            fd.append("password",this.form.password);
            fd.append("name",this.form.name);
            fd.append("phone",this.form.phone);
            fd.append("location",this.form.location);
            this.$axios
                .post("/volunteer/admin/addpublisher", fd)
                .then(res => {
                    if (res.data.code==200) {
                        this.$notify.success({
                            title: "添加成功"
                        });
                    } else {
                        this.$notify.error({
                            title: "添加失败"
                        });
                    }
                })
                .catch(err => {
                    this.$notify.error({
                        title: "服务器连接失败"
                    });
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
.container{
    padding-left: 200px;
    padding-top: 20px;

}
</style>
