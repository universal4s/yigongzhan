<template>
    <div>
        <!-- <div class="Site"> -->
            <!-- 此处为顶部导航栏 -->
            <!-- 此处为主要内容区 -->
            <!-- 此处是底部版权区 -->
        <!-- </div> -->
        <el-container>
            <el-header>
                <!-- Header content -->
                <nav-bar></nav-bar>
            </el-header>
            <el-main>
                <!-- Main content -->
                <main-page class="Site-content"></main-page>
            </el-main>

            <el-footer>
                <!-- Footer content -->
                <footer-page></footer-page>
            </el-footer>
        </el-container>
    </div>
</template>
   
<script>
import NavBar from "./nav.vue";
import MainPage from "./main.vue";
import FooterPage from "./footer.vue";

export default {
    data() {
        return {};
    },
    components: {
        NavBar,
        MainPage,
        FooterPage
    }
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
.Site {
    display: flex;
    display: -webkit-flex; /* Safari */
    min-height: 100vh;
    flex-direction: column;
}
.Site-content {
    flex: 1;
}
</style>
