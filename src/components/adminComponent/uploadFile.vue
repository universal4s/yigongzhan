<template>
    <div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :file-list="fileList"
            :auto-upload="false"
            :before-upload="beforeFileUpload"
            :before-remove="beforeFileRemove"
            :on-change="onChange"
            :limit="1"
            :on-success="success"
        >
        <b-button variant="outline-success" slot="trigger">导入excel</b-button>
            <!-- <el-button slot="trigger" size="small" type="primary">导入excel</el-button> -->
        </el-upload>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileList: []
        };
    },
    methods: {
        beforeFileUpload(file) {
            let fd=new FormData();
            fd.append("volunteer_file",file);
            fd.append("user_id","T1001503")
            this.$axios.post("/api/v1.1/uploadVolunteerFile",fd,this.headers).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
                
            })
            return true;
        },
        beforeFileRemove(file, fileList) {
            console.log(file);
        },
        onChange(file, filelist) {
            let isLimit = this.checkFileType(file);
            //console.log(filelist);
            // console.log(isLimit);

            if (!isLimit) {
                let f = filelist.splice(-1, 1);
                this.fileList = filelist;
            } else {
                this.submit();
            }
        },
        checkFileType(file) {
            let t = file.name.substring(file.name.lastIndexOf(".") + 1);
            const Limit = ["xlsx", "xls"];
            const isLimit = Limit.includes(t);
            if (!isLimit) {
                this.$notify.error({
                    title: "文件类型错误"
                });
            }
            return isLimit;
        },
        submit() {
            this.$refs.upload.submit();
            // let fd=new FormData()
            // fd.append("user_id","T1001503");
            // fd.append("volunteer_file",this.$refs.upload.)
        },
        success() {
            this.$notify({
                title: "文件上传成功",
                type: "success",
                duration: 3000
            });
        }
    },
    computed:{
        headers(){
            return {
                'Content-Type':'multipart/form-data'
            }
        }
    }
};
</script>
<style scoped>
</style>
