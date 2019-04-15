<template>
    <div id="studentTable">
        <form>
            <div class="form-group row">
                <div class="col-sm-4">
                    <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        placeholder="输入关键字"
                        v-model="keyWords"
                    >
                </div>
            </div>
        </form>
        <div>
            <table class="table table-striped table-bordered" align="center" ref="activeTable" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">姓名</th>
                        <th scope="col">学号</th>
                        <th scope="col">专业</th>
                        <th scope="col">学院</th>
                        <th scope="col">联系方式</th>
                        <th scope="col">总工时</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in SearchStu(keyWords)" :key="index">
                        <th scope="row">{{ index+1 }}</th>
                        <th>{{ item.name }}</th>
                        <th>{{ item.Sid }}</th>
                        <th>{{ item.major }}</th>
                        <th>{{ item.college }}</th>
                        <th>{{ item.telNumber }}</th>
                        <th>{{ item.total }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:"studentList",
    data(){
        return {
            keyWords:'',
            name:'',
            Sid:'',
            major:'',
            college:'',
            telNumber:'',
            total:0,
            studentList:[
                {name:"位展鹏",Sid:'162210708118',major:'计算机科学与技术',college:'计算机学院',telNumber:'17368089870',total:11.5},
                {name:"位小鹏",Sid:'162210708228',major:'计算机科学与技术',college:'计算机学院',telNumber:'13338818769',total:12}

            ]
        }
    },
    methods: {
        SearchStu(keyWords){
            let list=[]
            this.studentList.forEach(ele => {
                if(ele.name.indexOf(keyWords)!=-1||ele.Sid.indexOf(keyWords)!=-1){
                    list.push(ele)
                }
            });
            return list
        }
    },

}
</script>
<style scoped>
#studentTable {
    width: 80%;
    float: left;
    height: auto;
}
th{
        text-align:center;/** 设置水平方向居中 */
        vertical-align:middle/** 设置垂直方向居中 */
}
</style>
