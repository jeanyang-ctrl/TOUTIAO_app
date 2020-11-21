<template>
  <van-cell class="comment-item" v-for="(item, index) in comments" :key="index">
    <!-- 头像 -->
    <template #icon>
      <van-image class="avatar" round fit="cover" :src="item.aut_photo" />
    </template>

    <template #title>
      <div class="title-wrap">
        <div class="user-name">{{ item.aut_name }}</div>

        <van-button
          class="like-btn"
          :icon="item.is_liking ? 'good-job' : 'good-job-o'"
          :loading="commentLoading"
          @click="onCommentLike(item)"
        >
          {{ item.like_count || "赞" }}
        </van-button>
      </div>
    </template>

    <template #label>
      <div>
        <p class="comment-content">{{ item.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ item.pubdate }}</span>
          <van-button class="reply-btn" round>
            回复 {{ item.reply_count }}
          </van-button>
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
    comments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async onCommentLike(comment) {
      this.commentLoading = true;
      try {
        if (!comment.is_liking) {
          const { data } = await addCommentLike(comment.com_id);
          // 增加点赞数
          comment.like_count++;
        } else {
          const { data } = await deleteCommentLike(comment.com_id);
          comment.like_count--;
        }
      } catch (err) {
        this.$toast("操作失败");
      }
      comment.is_liking = !comment.is_liking;
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
