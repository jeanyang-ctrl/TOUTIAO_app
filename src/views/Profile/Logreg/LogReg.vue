<template>
  <div class="login-container">
    <!-- nav-bar -->
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>
    <!-- form field -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="[{ required: true, message: '手机号不能为空' }]"
      >
        <template #left-icon>
          <van-icon class="login-icon" name="contact"
        /></template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="验证码"
        type="number"
        maxlength="6"
        :rules="[{ required: true, message: '验证码不能为空' }]"
      >
        <template #left-icon>
          <van-icon class="login-icon" name="envelop-o"
        /></template>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            round
            class="send-sms-btn"
            type="info"
            @click="onSendSms"
            >验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          round
          block
          style="background-color: pink;"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/network/profile/user";

export default {
  name: "LogReg",
  data(){
   return {
      user: {
      mobile: "13911111111",
      code: "246810",
    },
    isCountDownShow: false, // 是否展示倒计时
   }
  },
  // props: {
  //   user: {
  //     mobile: number,
  //     code: number,
  //   },
  //   isCountDownShow: {
  //     type: Boolean,
  //     default: false,
  //   }, // 是否展示倒计时
  // },
  methods: {
    async onSubmit() {
      // const user = this.user
      // 1. 展示登陆中 loading
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认 2000，0 表示持续展示不关闭
      });

      // 2. 请求登录
      try {
        const { data } = await login(this.user);
        console.log(data.data);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");

        // 登录成功，跳转回原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        // this.$router.back();
        this.$router.push('/profile')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style scoped>
/* .login-container  .login-icon {
   font-size: 37px; 
} */
.login-container .send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  /* font-size: 22px; */
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
}
.login-btn {
  background-color: #6db4fb;
  border: none;
}
</style>
