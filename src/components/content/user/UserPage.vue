<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      :title="`${user.name}的博客`"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="user-info">
      <div class="base-info">
        <van-image
          class="avatar"
          round
          fit="cover"
          :src="user.photo"
        />
        <div class="right-area">
          <div class="stats-wrap">
            <div class="stats-item">
              <span class="count">{{user.art_count}}</span>
              <span class="text">发布</span>
            </div>
            <div class="stats-item">
              <span class="count">{{user.follow_count}}</span>
              <span class="text">关注</span>
            </div>
            <div class="stats-item">
              <span class="count">{{user.fans_count}}</span>
              <span class="text">粉丝</span>
            </div>
            <div class="stats-item">
              <span class="count">{{user.like_count}}</span>
              <span class="text">获赞</span>
            </div>
          </div>
            <follow-user
            v-model:is_followed="user.is_followed"
            :user-id="user.id"
          ></follow-user>
         
        </div>
      </div>
      <div class="label-info">
        <div class="bio-wrap">
          <span class="label">简介：</span>
          <span class="text">{{user.intro}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetUserPage } from "@/network/home/comment";

import FollowUser from "@/components/common/followuser/copyFollowUser";

export default {
  name: "UserIndex",
  components: {
    FollowUser,
  },
  props: {
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      user:{}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.onloadUser()
  },
  mounted() {},
  methods: {
    async onloadUser() {
      // console.log(this.$store.state.user.token);
      try {
        const { data } = await GetUserPage(this.$route.params.userId);
        this.user = data.data;
        console.log(data);
      } catch (err) {
        this.$toast("获取用户数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped>
::v-deep .user-container .user-info {
  background-color: #fff;
  padding: 25px 32px;
}
::v-deep .base-info {
  display: flex;
  margin-bottom: 25px;
}
::v-deep .avatar {
  width: 155px;
  height: 155px;
  margin-right: 62px;
}
::v-deep .label-info {
  font-size: 25px;
}
::v-deep .bio-wrap .label {
  color: #646263;
}
::v-deep .text {
  color: #212121;
}
::v-deep .right-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
  margin-bottom: 20px;
}
::v-deep .stats-wrap {
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
}
::v-deep .stats-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
::v-deep .count {
  font-size: 26px;
  color: #0d0a10;
}
::v-deep .text {
  font-size: 21px;
  color: #9c9b9d;
}

::v-deep .follow-btn {
  width: 289px;
  height: 55px;
  line-height: 55px;
  background-color: #6bb5ff;
  color: #fff;
  border: none;
}
</style>
