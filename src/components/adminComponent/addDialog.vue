<template>
    <div>
        <el-dialog
            title="用户添加"
            :visible.sync="Visible"
            width="30%"
            @close="dialogClose"
            :modal="true"
            :before-close="beforeClose"
        >
            <router-link to="/admin/uploadFile" tag="span" class="btn btn-outline-primary btn-sm" >上传文件</router-link>
            <router-link to="/admin/addSingle" tag="span" class="btn btn-outline-primary btn-sm">单用户添加</router-link>
            <div id="dia">
                <router-view></router-view>
            </div>
            <span slot="footer">
                <el-button>取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import UploadFile from "./uploadFile.vue";
import AddSingle from "./addSingle.vue";
export default {
    data() {
        return {
            isVisible: false
        };
    },
    props: ["Visible"],
    methods: {
        dialogClose() {
            this.$notify.info({
                title: "窗口关闭了"
            });
        },
        beforeClose() {
            this.$emit("close");
        }
    },
    components: {
        UploadFile,
        AddSingle
    },
    created() {
    }
};
</script>
<style scoped>
#dia{
    display: flex;
    align-items:flex-start;
    justify-content:flex-start;
    margin-top: 25px;
    margin-bottom: 25px;
}
</style>
