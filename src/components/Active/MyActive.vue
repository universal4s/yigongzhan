<template>
    <div>
        <el-tabs>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="我的活动" name="first">
                    <all-my-active/>
                </el-tab-pane>
                <el-tab-pane label="添加活动" name="second">
                    <create-active/>
                </el-tab-pane>
                
            </el-tabs>
        </el-tabs>
    </div>
</template>
<script>
import CreateActive from "./createActive.vue";
import AllMyActive from "./AllMyActive.vue";
export default {
    data() {
        return {
            activeName: "first"
        };
    },
    components: {
        CreateActive,
        AllMyActive
    }
};
</script>
<style scoped>
</style>
