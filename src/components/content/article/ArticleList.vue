<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewChannels } from "@/network/home/article";
// @ is an alias to /src
import ArticleItem from "@/components/content/article/ArticleItem";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    // 必填的对象 prop验证方式
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      timestamp: null,
      loading: false,
      finished: false,
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false,
    };
  },
  created() {
    // this.onload()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getNewChannels({
          channel_id: this.channel.id, // 频道ID
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        const { results } = data.data;
        this.list.push(...results);
        // console.log(data);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 数据全部加载完成
          this.finished = true;
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true;
        // 请求失败了，loading 也需要关闭
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getNewChannels({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        const { results } = data.data;
        this.list.unshift(...results);

        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.$toast("刷新失败");
          this.isreFreshLoading = false;
        }
        this.$toast("刷新成功");
        this.isreFreshLoading = false;
      } catch (err) {
        // 请求失败了，loading 也需要关闭
        this.isreFreshLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.article-list {
  /* 记住自己的滚动位置 vh*/
  overflow-y: hidden;
  height: 100%;
  padding-bottom: 100px;
  padding-top: 172px;
}
</style>
