<template>
  <div class="home-tab">
    <!-- 标签栏 -->
    <van-tabs class="channel-tabs" v-model:active="active" swipeable animated>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 频道列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 汉堡插条 -->
      <template v-slot:nav-right>
        <div class="placeholder">123</div>
        <div class="hamberge-btn" @click="showPopup">
          <img src="@/assets/img/home/hamberge.svg" />
        </div>
        <van-popup
          v-model:show="isChannelEditShow"
          closeable
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '100%' }"
        >
          <!-- 频道编辑 -->
          <channel-edit
            :mychannels="channels"
            :myactive="active"
            @update-active="onUpdateActive"
          ></channel-edit>
        </van-popup>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/network/profile/user";
import ArticleList from "@/components/content/article/ArticleList";
import ChannelEdit from "@/components/content/article/ChannelEdit";
// @ is an alias to /src

import { mapState } from "vuex";

import { getItem } from "@/utils/storage";

export default {
  name: "HomeTab",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      // 首页获取的数据 频道列表
      channels: [],
      isChannelEditShow: false,
    };
  },
  computed: {
    // Write operation failed: computed property "active" is readonly.
    active() {
      console.log(this.active);
      return this.active;
    },
  },
  watch: {},
  created() {
    this.loadChannels();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // async loadChannels() {
    //   let channels = [];
    //   if (this.user) {   
    //   } else {
    //   }
    //   this.channels = channels;
    // },
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        let channels = []

        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          //    有，拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
            //    没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },


    showPopup() {
      this.isChannelEditShow = !this.isChannelEditShow;
    },
    onUpdateActive(index, isChannelEditShow = true) {
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
  },
};
</script>

<style scoped>
/* .home-tab{
  position: relative;
} */
::v-deep .channel-tabs .van-tabs__wrap {
  height: 82px;
  position: fixed;
  top: 92px;
  z-index: 1;
  left: 0;
  right: 0;
}
::v-deep .channel-tabs .van-tab {
  min-width: 200px;
  border-right: 1px solid #edeff3;
  font-size: 33px;
  color: #777;
}
::v-deep .channel-tabs .van-tabs__line {
  bottom: 8px;
  width: 31px;
  /* height: 6px; */
  background-color: var(--color-tint);
}
::v-deep .channel-tabs .van-tabs__nav--line {
  padding-bottom: 0;
}
::v-deep .channel-tabs .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
::v-deep .channel-tabs .hamberge-btn {
  position: fixed;
  right: 0;
  /* display:flex;
  align-items: center;
  justify-content: center; */
  width: 66px;
  height: 82px;
  border-radius: 20%;
  opacity: 0.902;
  background-color: #fff;
}
::v-deep .channel-tabs .hamberge-btn img {
  width: 100%;
  height: 100%;
}
::v-deep .channel-tabs .hamberge-btn::before {
  content: "";
  position: absolute;
  left: 0;
  width: 2px;
  height: 100%;
  background-image: url(~@/assets/img/home/gradient-gray-line.png);
  background-size: contain;
}
</style>
