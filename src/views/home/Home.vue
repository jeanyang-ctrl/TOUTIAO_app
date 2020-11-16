<template>
  <div class="home-container">
    <van-nav-bar  class="home-nav-bar">
      <template #title>
        <van-button class="search-btn" plain type="info" round>
          <van-icon name="search" color="#ff557f" size="18" />搜索</van-button
        >
      </template>
    </van-nav-bar>
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
    return {
    };
  },
};
</script>


<style scoped>
.home-container {
  color: #ccc;
}
.home-container >>> .home-nav-bar{
  position: fixed;
  left: 0;
  right: 0;
  top:0;
}
.home-container >>> .van-nav-bar__content {
  background-color: var(--color-tint);
}
.home-container >>> .search-btn {
  width: 555px;
  height: 64px;
  border: none;
  background-color: pink;
  opacity: 0.6;
}
/* .home-container >>> .van-button::before {
  font-style: 32px!important;
} */
.home-container >>> .van-nav-bar__title {
  max-width: unset;
}
</style>
