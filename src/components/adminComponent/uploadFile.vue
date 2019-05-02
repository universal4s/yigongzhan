<template>
  <div >
    <div style="height:80px">
      <el-upload
      class="upload-demo"
      ref="upload"
      action="http://www.biggsai.com/upload"
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
    <b-button v-b-modal.modal-1 @click="preview_file">预览</b-button>
    <b-button variant="outline-success" slot="trigger" @click="submit">上传</b-button>
    <b-alert :show="isshow">功能测试中，暂不可使用</b-alert>
    <b-modal id="modal-1" size="xl" title="数据预览" no-close-on-backdrop="true">
      <!-- <p class="my-4">Hello from modal!</p> -->
      <b-table striped hover :items="items"></b-table>
    </b-modal>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      fileList: [],
      items: [],
      isshow:false
    };
  },
  methods: {
    beforeFileUpload(file) {
      let fd = new FormData();
      fd.append("volunteer_file", file);
      fd.append("user_id", "T1001503");
      this.$axios
        .post("/api/v1.1/uploadVolunteerFile", fd, this.headers)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
        // this.submit();
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.items = tabJson[0].sheet.concat(tabJson[0].sheet);
          console.log("数据", this.items);
        }
      });
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
        // reader.readAsBinaryString(file) // 传统input方法
      });
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
      this.isshow=true;
      // this.$refs.upload.submit();
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
    },
    preview_file() {
      let _this = this;
      let obj = _this.fileList[0];
    }
  },
  computed: {
    headers() {
      return {
        "Content-Type": "multipart/form-data"
      };
    }
  }
};
</script>
<style scoped>
</style>
