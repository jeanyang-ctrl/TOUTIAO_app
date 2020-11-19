<template>
  <div class="article-content">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="今日头条" @click-left="$router.back()"></van-nav-bar>
    <!-- 主体区域 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical >加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.aut_id">
        <!-- 文章标题 -->
        <h1 class="article-title">这是文章标题</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <template #title>
            <van-image
              class="avatar"
              round
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="user-name">头条号</div>
          </template>
          <template #label>
            <div class="publish-date">14小时前</div>
          </template>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button>-->
        </van-cell>

        <!-- 文章内容 -->
        <div class="article-content">这是文章内容</div>
        <van-divider>正文结束</van-divider>
      </div>

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>
<script>
import { getArticleById } from "@/network/home/article";

export default {
  name: "ArticleContent",
  data() {
    return {
      article: {},
      errStatus: 0,
      loading: true,
    };
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      // 请求文章数据接口后，文章点进来的时候报get:404错误，显示该文章不存在，是因为后台返回的id超过js安全整数范围
      // const articleID = this.$route.params
      this.loading = true;
      try {
        const { data } = await getArticleById(this.articleId);
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsankljdnskaljndlkjsa')
        // }
        console.log(data);
        this.article = data.data;
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false;
    },
  },
};
</script>
<style scoped>
::v-deep .article-container .main-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 88px;
  overflow-y: scroll;
  background-color: #fff;
}
::v-deep .article-detail .article-title {
  font-size: 40px;
  padding: 50px 32px;
  margin: 0;
  color: #3a3a3a;
}

::v-deep .user-info {
  padding: 0 32px;
}
::v-deep .avatar {
  width: 70px;
  height: 70px;
  margin-right: 17px;
}
::v-deep .van-cell__label {
  margin-top: 0;
}
::v-deep .user-name {
  font-size: 24px;
  color: #3a3a3a;
}
::v-deep .publish-date {
  font-size: 23px;
  color: #b7b7b7;
}
::v-deep .follow-btn {
  width: 170px;
  height: 58px;
}

::v-deep .article-content {
  padding: 55px 32px;
}
::v-deep .article-content p {
  text-align: justify;
}

::v-deep .loading-wrap {
  padding: 200px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

::v-deep .error-wrap {
  padding: 200px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
::v-deep .van-icon {
  font-size: 122px;
  color: #b4b4b4;
}
::v-deep .text {
  font-size: 30px;
  color: #666666;
  margin: 33px 0 46px;
}
::v-deep .retry-btn {
  width: 280px;
  height: 70px;
  line-height: 70px;
  border: 1px solid #c3c3c3;
  font-size: 30px;
  color: #666666;
}

::v-deep .article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
}
::v-deep .comment-btn {
  width: 282px;
  height: 46px;
  border: 2px solid #eeeeee;
  font-size: 30px;
  line-height: 46px;
  color: #a7a7a7;
}
::v-deep .van-icon {
  font-size: 40px;
}
::v-deep .van-icon .van-info {
  font-size: 16px;
  background-color: #e22829;
}
</style>
