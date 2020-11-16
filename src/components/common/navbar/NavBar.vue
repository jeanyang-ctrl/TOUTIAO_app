<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
.nav-bar {
  position:fixed;
  top:0;
  left:0;
  right:0;
  display: flex;
  height: 84px;
  line-height: 84px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
  text-align: center;
}
.left .right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>
