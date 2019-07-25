<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'app',
    }
</script>

<style>
    body{
        background-image: url("./assets/img_bg.png");
        background-size: 100%;
        background-position: center center;
        display: block;
        padding: 0;
        margin: 0;
    }
</style>
