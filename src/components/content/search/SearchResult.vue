<template>
  <!-- 侧导航栏 -->
  <div class="search-result">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from "@/network/home/search";

export default {
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        // if (Math.random() > 0.5) {
        //   JSON.parse("dsnajndjsa");
        // }

        // 记住
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;

        if (results.length) {
          this.page++;
          console.log(this.page);
        } else {
          // 停止加载
          this.finished = true;
        }
      } catch (err) {
        this.$toast("网速加载太慢");
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped></style>
