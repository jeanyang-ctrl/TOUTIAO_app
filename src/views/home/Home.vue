<template>
  <div class="home-container">
    <!-- 搜索功能 -->
    <van-nav-bar class="home-nav-bar">
      <template #title>
        <van-button class="search-btn" plain type="info" round to="/search">
          <van-icon name="search" color=" var(--color-tint)" size="18" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 标签栏 -->
    <home-tab></home-tab>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTab from "@/views/Home/childcpns/HomeTab.vue";

export default {
  name: "Home",
  components: {
    HomeTab,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.home-container {
  color: #ccc;
}
.home-container >>> .home-nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.home-container >>> .van-nav-bar__content {
  background-color: #E5B1B5;
}
.home-container >>> .search-btn {
  width: 555px;
  height: 64px;
  border: none;
  background-color: var(--color-tint);
  opacity: 0.6;
  
}
.home-container >>> .search-btn i{
   vertical-align:middle;

}
/* .home-container >>> .van-button::before {
  font-style: 32px!important;
} */
.home-container >>> .van-nav-bar__title {
  max-width: unset;
}
</style>
