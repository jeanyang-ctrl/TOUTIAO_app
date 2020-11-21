<template>
  <div class="follow-user">
    <div>
      <van-button
        class="follow-btn"
        type="info"
        color="#ff8198"
        round
        :loading="followLoading"
        size="small"
        v-if="is_followed"
        @click="onFollow"
      >
        关注
      </van-button>
      <van-button
        v-else
        class="follow-btn"
        round
        :loading="followLoading"
        size="small"
        color="#ff8198"
        @click="onFollow"
      >
        已关注
      </van-button>
    </div>
  </div>
</template>
<script>
import { deleteFollow, addFollow } from "@/network/profile/user";

export default {
  name: "FollowUser",
  data() {
    return {
      followLoading: false,
    };
  },
  created(){
  },
  // props: {
  // articleUser: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  props: {
    is_followed: Boolean,

    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onFollow() {
      this.followLoading = true;
      try {
        if (this.isFollowed) {
          const { data } = await deleteFollow(this.userId);
        } else {
          const { data } = await addFollow(this.userId);
        }
        // this.articleUser.is_followed = !this.articleUser.is_followed;
        this.$emit("update:is_followed", !this.is_followed);
      } catch (err) {
        // 用户不能关注自己
        let message = "操作失败，请重试 ";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己 ";
        }
        this.$toast(message);
      }
      console.log(this.is_followed);
      this.followLoading = false;
    },
  },
};
</script>
<style scoped>
::v-deep .follow-btn {
  width: 170px;
  height: 58px;
}
</style>
