<template>
    <div id="app">
        <index></index>
    </div>
</template>

<script>
import Index from './components/index.vue'

export default {
    name: "App",
    components: {
        Index
    }
};
</script>
<style>
#main {
    width: auto;
    margin-left: auto;
    margin-right: auto;
}
html {
    height: 100%;
}
</style>

