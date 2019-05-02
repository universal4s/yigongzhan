<template>
    <div>
        <el-button type="success" @click="ExportExcel"> 导出</el-button>
    </div>
</template>
<script>

export default {
    methods:{
        ExportExcel(){
            let bos=xlsx.utils.table_to_book(document.querySelector('#volun_data'));
            let out=xlsx.write(box,{
                bookType:'xlsx',
                bookSST:true,
                type:array
            })
            try{
                filesaver.saveAs(
                    new Blob([out],{
                        type:'application/octet-stream'
                    }),
                    'volunteer.xlsx'
                )
            }
            catch(e){
                console.log('导出出错');
                
            }
        }
    }
}
</script>