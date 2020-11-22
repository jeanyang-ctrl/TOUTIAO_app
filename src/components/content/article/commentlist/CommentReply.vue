<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <!-- <template  #left>
        <van-icon name="cross"/>
      </template> -->
    </van-nav-bar>
    <div class="scroll-wrap">
      <comment-item :comment="comment" />
      <van-cell title="全部回复" />
      <!-- 重用的时候想要改那些数据直接传值就好 -->
      <comment-list :list="commentList" :source="comment.com_id" type="c" />
    </div>
    <div class="post-wrap">
      <van-button
        class="post-btn"
        siza="small"
        type="primary"
        rounds
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup v-model:show="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>
<script>
import CommentItem from "@/components/content/article/commentlist/CommentItem";
import CommentList from "@/components/content/article/CommentList";
import CommentPost from "@/components/content/article/commentlist/CommentPost";

export default {
  name: "CommentReply",
  data() {
    return {
      commentList: [],
      isPostShow: false,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  methods: {
    onPostSuccess(data) {
      console.log(data);
      this.comment.reply_count++;
      // this.isPostShow = false
      this.commentList.unshift(data.new_obj);
    },
  },
};
</script>
<style scoped>
::v-deep .scroll-wrap {
  position: fixed;
  top: 262px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

::v-deep .post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
}
::v-deep .post-btn {
  width: 60%;
}
</style>
