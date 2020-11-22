<template>
  <van-cell class="comment-item" >
    <!-- 头像 -->
    <template #icon>
      <van-image class="avatar" round fit="cover" :src="comment.aut_photo" />
    </template>

    <template #title>
      <div class="title-wrap">
        <div class="user-name">{{ comment.aut_name }}</div>

        <van-button
          class="like-btn"
          :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
          :loading="commentLoading"
          @click="onCommentLike"
        >
          {{ comment.like_count || "赞" }}
        </van-button>
      </div>
    </template>

    <template #label>
      <div>
        <p class="comment-content">{{comment.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ comment.pubdate }}</span>
          <!-- 点击回复，向外发送事件， -->
          <van-button
            class="reply-btn"
            round
            @click="$emit('reply-click', comment)"
          >
            回复 {{ comment.reply_count }}
          </van-button>
          <!-- 回复评论    结束 -->
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from "@/network/home/comment";

export default {
  name: "CommentItem",
  data() {
    return {
      commentLoading: false,
    };
  },
  props: {
    // comments: {
    //   type: Array,
    //   required: true,
    // },
     comment:{
      type:Object,
      required:true
    },
  },
  methods: {
    async onCommentLike() {
      this.commentLoading = true;
      try {
        if (!this.comment.is_liking) {
          const { data } = await addCommentLike(this.comment.com_id);
          // 增加点赞数
          this.comment.like_count++;
        } else {
          const { data } = await deleteCommentLike(this.comment.com_id);
          this.comment.like_count--;
        }
      } catch (err) {
        this.$toast("操作失败");
      }
      this.comment.is_liking = !this.comment.is_liking;
      this.commentLoading = false;
    },
  },
};
</script>
<style scoped>
.comment-item .avatar {
  width: 72px;
  height: 72px;
  margin-right: 25px;
}
::v-deep .title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .user-name {
  color: #406599;
  font-size: 26px;
}

::v-deep .comment-content {
  font-size: 32px;
  color: #222222;
  word-break: break-all;
  text-align: justify;
}
::v-deep .comment-pubdate {
  font-size: 19px;
  color: #222;
  margin-right: 25px;
}
::v-deep .bottom-info {
  display: flex;
  align-items: center;
}
::v-deep .reply-btn {
  /*  width: 135px; */
  height: 48px;
  line-height: 48px;
  font-size: 21px;
  color: #222;
}
::v-deep .like-btn {
  height: 30px;
  padding: 0;
  border: none;
  font-size: 19px;
  line-height: 30px;
  margin-right: 7px;
}
:v-deep .van-icon {
  font-size: 30px;
}
::v-deep .van-icon-good-job-o::before {
  color: #e5645f;
}
</style>
