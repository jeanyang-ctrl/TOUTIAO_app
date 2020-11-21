<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item :comments="list"></comment-item>
    </van-list>
  </div>
</template>

<script>
import CommentItem from "@/components/content/article/commentlist/CommentItem";

import { getComments } from "@/network/home/comment";

export default {
  name: "CommentList",
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      type: "c",
      offset: null, // 获取下一页数据的标记
      limit: 10,
    };
  },
  props: {
    userId: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    // 评论数据只有在加载列表组件才会显示，所以的在此调用
    this.onLoad();
  },
  components: {
    CommentItem,
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      this.loading = true;
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.userId.toString(),
          // source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });

        // 把真正修改的数据发送给服务器
        this.$emit("onload-success", data.data);
        
        const { results } = data.data;

        this.list.push(...results);

        // 数据全部加载完成
        if (this.list.length) {
          this.offset = results.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.$toast("加载失败");
      }
      // 加载状态结束
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped></style>
