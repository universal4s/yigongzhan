<template>
    <div>
        <el-button plain @click="open('success')">成功</el-button>
        <el-button plain @click="open('warning')">警告</el-button>
        <el-button plain @click="open('info')">消息</el-button>
        <el-button plain @click="open('error')">错误</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        open(Type) {
            this.$notify({
                titile:"这是一条测试消息",
                message:"这是测试消息内容",
                type:Type,
                offset:100
            })
        },
    }
};
</script>