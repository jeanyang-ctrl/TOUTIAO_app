<template>
  <div class="article-content">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="今日头条"
      @click-left="$router.back('/home')"
    ></van-nav-bar>
    <!-- 主体区域 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.pubdate">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <template #icon>
            <van-image
              class="avatar"
              round
              fit="cover"
              :src="article.aut_photo"
            />
          </template>
          <template #title>
            <div class="user-name">{{ article.aut_name }}</div>
          </template>
          <template #label>
            <div class="publish-date">{{ article.pubdate }}</div>
          </template>
          <!-- 关注用户 -->
          <!-- <follow-user :article-user="article" ></follow-user> -->
          <follow-user
            v-model:is_followed="article.is_followed"
            :user-id="article.aut_id"
          ></follow-user>
        </van-cell>
        <!-- 文章内容 -->
        <div
          ref="article-content"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域  -->
        <comment-list
          :user-id="article.aut_id"
          :list="commentList"
          @onload-success="totalCommentCount = $event.total_count"
        />
        <!-- 加载完成结束------文章详情 -->
      </div>

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
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
      <!-- 发布评论 -->
      <van-popup
        v-model:show="isPostShow"
        position="bottom"
        closeable
      >
        <comment-post  :target="article.art_id"
        @post-success="onPostSuccess"/></van-popup
      >
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论
      </van-button>

      <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />

      <van-icon name="share" color="#777777" @click="showShare = true" />
      <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
  </div>
</template>
<script>
import { getArticleById } from "@/network/home/article";

import { ImagePreview } from "vant";

// import FollowUser from "@/components/common/followuser/FollowUser";
import FollowUser from "@/components/common/followuser/copyFollowUser";
import CommentList from "@/components/content/article/CommentList.vue";
import CommentPost from "@/components/content/article/commentlist/CommentPost.vue";



export default {
  name: "ArticleContent",
  data() {
    return {
      article: {},
      errStatus: 0,
      loading: true,
      totalCommentCount: 0,
      isPostShow: false,
      showShare: false,
      commentList:[],
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
    };
  },
  components: {
    FollowUser,
    CommentList,
    CommentPost
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
        this.article = data.data;
        // error format
        // setTimeout(function() {
        //   this.previewImage();
        // }, 0);
        // 定时器第一个参数必须是回调函数
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false;
    },
    previewImage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.onclick = () => {
          ImagePreview({
            images,
            closeable: true,
            startPosition: index,
          });
          console.log(images);
        };
      });
    },
    onPostSuccess(data){
      this.isPostShow=false;
      this.totalCommentCount++
      console.log(data.new_obj);
      this.commentList.unshift(data.new_obj)
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>
<style scoped>
/* 加分号 */
/* @import '@/assets/css/github-markdown.css'; */
@import "./github-markdown.css";

::v-deep .main-wrap {
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
::v-deep .user-info .avatar {
  width: 70px;
  height: 70px;
  margin-right: 17px;
}
::v-deep .user-info .van-cell__label {
  margin-top: 0;
  text-align: left;
}
::v-deep .user-info .user-name {
  font-size: 24px;
  color: #3a3a3a;
  text-align: left;
}
::v-deep .user-info .publish-date {
  font-size: 23px;
  color: #b7b7b7;
}
/* ::v-deep .user-info .follow-btn {
  width: 170px;
  height: 58px;
} */

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
