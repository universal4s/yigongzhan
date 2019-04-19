<template>
    <div>
        <el-container>
            <el-header>
                <nav-bar></nav-bar>
            </el-header>
            <el-main>
                <main-page class="Site-content"></main-page>
            </el-main>
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
