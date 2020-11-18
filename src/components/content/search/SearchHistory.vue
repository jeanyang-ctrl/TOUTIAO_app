<template>
  <!-- 侧导航栏 -->
  <div class="search-history">
    <van-cell  icon="search">
      <template #title>
        <div>搜索历史</div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { setItem, getItem } from "@/utils/storage";

export default {
  name: "SearchHistory",
  data() {
    return {
      historys:[]
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    // searchText: {
    //   // handler指向一个异步操作
    //   handler: debounce(function(value) {
    //     setItem("USER_HISTORY",this.historys.push(value));
    //   }, 200),

    //   immediate: true,
    // },
  },
};
</script>
<style scoped>
::v-deep .van-cell__title {
  text-align: left;
}
</style>
