<template>
    <router-view></router-view>
    <!-- <lay-out/> -->
    <main-tab-bar/>
</template>

<script>
import MainTabBar from "@/components/content/MainTabBar";
// import LayOut from "@/views/Layout/LayOut"

export default {
  name: "app",
  components: {
    //  LayOut,
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
