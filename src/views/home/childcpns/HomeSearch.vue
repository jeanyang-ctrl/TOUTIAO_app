<template>
  <!-- 搜索 -->
  <div class="home-search">
    <!-- 输入框 -->
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
    <!-- 历史记录/联想建议/搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText">
    </search-result>
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    >
    </search-suggestion>
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-all-histories="searchHistories = []"
      @searchItem="onSearch"
    >
    </search-history>
  </div>
</template>
<script>
import SearchHistory from "@/components/content/search/SearchHistory";
import SearchResult from "@/components/content/search/SearchResult";
import SearchSuggestion from "@/components/content/search/SearchSuggestion";

import { getSearchResult } from "@/network/home/search";

import { setItem, getItem } from "@/utils/storage";

const SEARCH_HISTORIES = "SEARCH_HISTORIES";

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
      searchHistories: getItem("SEARCH_HISTORIES") || [
        "给个大概",
        "你好",
        "世界",
        "马保国",
        "社会性死亡",
      ],
      page: 1,
      per_page: 20,
    };
  },
  watch: {
    searchHistories: {
      handler(val) {
        // 监听有问题，查错不知道从何开始，加入深度监听就好了
        setItem("SEARCH_HISTORIES", val);
      },
      deep:true//对象内部的属性监听，也叫深度监听
    },
  },
  methods: {
    async onSearch(val) {
      this.searchText = val;
      // 添加历史记录，在数组头部添加
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      // 触发搜索
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: val,
        });
      } catch (err) {
        this.$toast("获取失败");
      }
      this.isResultShow = true;
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
