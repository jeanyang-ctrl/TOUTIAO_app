<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/img/profile/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
   <!-- <div style="height:34px"></div> -->

    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="4" clickable>
      <van-grid-item class="grid-item">
        <van-icon name="star-o" color="#EABCBF" />
        <span class="text">消息通知</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <van-icon name="gift-o" color="#EABCBF"/>
        <span class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <van-icon name="star-o" color="#EABCBF" />
        <span class="text">浏览历史</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <van-icon name="gift-o" color="#EABCBF"/>
        <span class="text">下载管理</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->

    <van-cell class="bd" title="记录新鲜事" is-link />
    <van-cell class="bd bd-w" title="小智同学" is-link />
     <van-grid class=" mb-9" :column-num="4" border="true">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>

    <van-cell
      v-if="user"
      class="logout-cell bd  "
      clickable
      title="退出登录"
      @click="onLogout"
    />
       <div style="height:34px"></div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/network/profile/user";

export default {
  name: "Profile",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}, // 用户信息
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo();
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },

    async loadUserInfo() {
      // console.log(this.$store.state.user.token);
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      } catch (err) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped>
.my-container {
  background-color: #EABCBF;
}
::v-deep .header {
  height: 400px;
  background: url("~@/assets/img/profile/banner.jpg");
  background-size: cover;
}

::v-deep .not-login {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::v-deep .mobile-img {
  width: 132px;
  height: 132px;
  margin-bottom: 15px;
}
::v-deep .text {
  font-size: 28px;
  color: #fff;
}

::v-deep .user-info .base-info {
  height: 231px;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .left {
  display: flex;
  align-items: center;
}
::v-deep .avatar {
  width: 132px;
  height: 132px;
  border: 4px solid #fff;
  margin-right: 23px;
}

::v-deep .name {
  font-size: 30px;
  color: #fff;
}

::v-deep .data-stats {
  display: flex;
}
::v-deep .data-item {
  height: 130px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
::v-deep .count {
  font-size: 36px;
}
::v-deep .text {
  font-size: 23px;
}
/* 宫格导航 */
::v-deep .grid-nav .grid-item {
  height: 141px;
  flex-basis: 20%;
}

::v-deep span.text {
  font-size: 28px;
  color: black;
}

::v-deep .logout-cell {
  text-align: center;
  color: #d86262;
  font-size: 33px;
}

.bd{
  border:5px solid  #EABCBF; 
  box-shadow: pink;
}
.bd-w{
  border-top: 0;
}
::v-deep .mb-9 {
  margin:0 5px ;
  
}
</style>
