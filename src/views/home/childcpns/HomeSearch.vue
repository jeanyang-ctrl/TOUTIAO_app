<template>
  <!-- 侧导航栏 -->
  <div class="home-search">
    <form action="/">
      <van-search
        v-model="searchText"
        shape="round"
        background="var(--color-tint)"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
        placeholder="请输入搜索关键词"
        class="search-btn"
      />
    </form>
    <search-result v-if="isResultShow" :search-text="searchText">
    </search-result>
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    >
    </search-suggestion>
    <search-history v-else :search-text="searchText"> </search-history>
  </div>
</template>
<script>
import SearchHistory from "@/components/content/search/SearchHistory";
import SearchResult from "@/components/content/search/SearchResult";
import SearchSuggestion from "@/components/content/search/SearchSuggestion";

import { getSearchResult } from "@/network/home/search";

export default {
  name: "HomeSearch",
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  methods: {
    async onSearch(val) {
      this.searchText = val;
      this.isResultShow = true;

      // try {
      //   const { data } = await getSearchResult({
      //     page: this.page,
      //     per_page: this.per_page,
      //     q: val
      //   });
      //   console.log(data);
      // } catch (err) {
      //   this.$toast("获取失败");
      // }
    },
    onCancel(val) {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.search-btn {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.home-search {
  padding-top: 108px;
}
</style>
