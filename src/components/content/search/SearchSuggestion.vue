<template>
  <!-- 侧导航栏 -->
  <div class="search-suggestion">
    <van-cell v-for="(text, index) in suggestions" :key="index" icon="search"
    @click="$emit('search',text)">
      <template #title>
        <div v-html="highlight(text)"></div>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from "@/network/home/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      // handler指向一个异步操作
      handler: debounce(function(value) {
        this.loadSearchSuggestion(value);
      }, 200),

      immediate: true,
    },
  },
  created() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("获取联想建议失败");
      }
    },
    highlight(text) {
      //关键词
      const htmlStr = ` <span style="color:red">${this.searchText}</span>
`;
      //关键词正则检验
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, htmlStr);
    },
  },
};
</script>
<style scoped>
::v-deep .van-cell__title {
  text-align: left;
}
</style>
