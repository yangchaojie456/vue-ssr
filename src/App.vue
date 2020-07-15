<template>
    <div id="app">
        <div>
            <router-link to="/">main</router-link>
        </div>
        <router-link to="/foo">foo</router-link>
        <router-link to="/baz">baz</router-link>
        <router-link to="/bar">bar</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {}
};
</script>

<style>
</style>