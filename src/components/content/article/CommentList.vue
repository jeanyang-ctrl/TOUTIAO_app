<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 接收子组件的点击回复弹出框事件 -->
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      ></comment-item>
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
      offset: null, // 获取下一页数据的标记
      limit: 10,
    };
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  created() {
    this.loading = true;
    // 评论数据只有在加载列表组件才会显示，所以的在此调用
    this.onLoad();
  },
  components: {
    CommentItem,
  },
  methods: {
    async onLoad() {
      // 异步更新数据

      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          // source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });

        const { results } = data.data;

        this.list.push(...results);
        // 把真正修改的数据发送给服务器
        this.$emit("onload-success", data.data);

        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id;
        } else {
          // 没有就将 finished 设置结束
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
