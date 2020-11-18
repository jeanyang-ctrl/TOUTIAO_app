<template>
  <!-- 侧导航栏 -->
  <div class="lay-out">
    <router-view></router-view>
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from "@/components/content/MainTabBar";

export default {
  name: "LayOut",
  components: {
    MainTabBar,
  },
};
</script>
<style scoped></style>