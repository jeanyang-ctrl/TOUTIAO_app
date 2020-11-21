<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/network/home/comment";

export default {
  name: "CommentPost",
  data() {
    return {
      message: "",
    };
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        duration:0,
        message:'发布中',
        forbidClick:true //禁止背景点击
      })
      try {
        const { data } = await addComment({
          target:this.target,
          content:this.message,
          art_id:null //对文章进行评论success，不要传此参数
        });
        this.$toast.success("操作成功！！");
        // console.log(data.data);
        this.$emit('post-success',data.data)
      } catch (err) {
        this.$toast.fail("操作失败！！");
      }
    },
  },
};
</script>
<style scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
}
::v-deep .post-field {
  background-color: #f5f7f9;
}
::v-deep .post-btn {
  width: 150px;
  border: none;
  padding: 0;
  color: #6ba3d8;
}
::v-deep .post-btn::before {
  display: none;
}
</style>
