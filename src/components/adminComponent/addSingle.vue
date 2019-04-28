<template>
    <div class="container">
        <div class="main">
            <el-form :model="form" label-width="80px" :rules="rules" ref="addUserForm">
            <el-form-item label="姓名" prop="name" size="medium ">
                <el-col :span="6">
                    <el-input v-model="form.name">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="学号" prop="studentid" size="small">
                <el-col :span="6">
                    <el-input v-model="form.studentid"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password" size="small">
                <el-col :span="6">
                    <el-input v-model="form.password"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="sex" size="small">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option
                        v-for="item in genderOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入学年份" prop="inyear" size="small">
                <el-col :span="6">
                    <el-input v-model="form.inyear"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="专业" prop="major" size="small">
                <el-col :span="6">
                    <el-input v-model="form.major"></el-input>
                </el-col>
            </el-form-item >
            <el-form-item label="手机号码" prop="phone" size="small">
                <el-col :span="6">
                    <el-input v-model="form.phone"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item size="small">
                <el-button type="primary" @click="submitForm('addUserForm')">立即添加</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                password:"",
                name: "",
                studentid: "",
                sex: "男",
                major:"",
                inyear:"",
                phone: "",
            },
            genderOption: [
                {
                    value: "男",
                    label: "男"
                },
                {
                    value: "女",
                    label: "女"
                }
            ],
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
                studentid: [
                    {
                        required: true,
                        message: "请输入用户学号",
                        trigger: "blur"
                    },
                    {
                        min: 12,
                        max: 12,
                        message: "长度为 12 ",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入用户电话号码",
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
            let fd = new FormData();
            // password:"",
            //     name: "",
            //     studentid: "",
            //     sex: "m",
            //     major:"",
            //     inyear:"",
            //     phone: "",
            fd.append("password", this.form.password);
            fd.append("name", this.form.name);
            fd.append("studentid", this.form.studentid);
            fd.append("sex", this.form.sex);
            fd.append("major", this.form.major);
            fd.append("inyear", this.form.inyear);
            fd.append("phone", this.form.phone);
            // fd.append("vol_reg_date", "");

            this.$axios
                .post("/volunteer/admin/addstudentuser", fd)
                .then(res => {
                    if (res.data.code == 200) {
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
                        title: "服务器数据异常"
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

}
.main{
    padding-top: 20px;
}
</style>
