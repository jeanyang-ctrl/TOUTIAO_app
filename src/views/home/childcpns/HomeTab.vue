<template>
  <van-tabs class="channel-tabs" v-model="active" swipeable animated>
    <van-tab
      :title="channel.name"
      v-for="channel in channels"
      :key="channel.id"
    >
      <article-list :channel="channel"></article-list>
    </van-tab>
    <template v-slot:nav-right>
      <div class="placeholder">123</div>
      <div class="hamberge-btn">
        <img src="@/assets/img/home/hamberge.svg" />
      </div>
    </template>
  </van-tabs>
</template>

<script>
import { getUserChannels } from "@/network/profile/user";
import ArticleList from "../../../components/content/article/ArticleList";

// @ is an alias to /src
export default {
  name: "HomeTab",
  components: {
    ArticleList,
  },
  data() {
    return {
      active: 0,
      channels: [],
    };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        // console.log(data);
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast("获取频道数据失败");
      }
    },
  },
};
</script>

<style scoped>
.channel-tabs >>> .van-tabs__wrap {
  height: 82px;
  position: fixed;
  top: 92px;
  z-index:1;
  left: 0;
  right: 0;
}
.channel-tabs >>> .van-tab {
  min-width: 200px;
  border-right: 1px solid #edeff3;
  font-size: 33px;
  color: #777;
}
.channel-tabs >>> .van-tabs__line {
  bottom: 8px;
  width: 31px;
  /* height: 6px; */
  background-color: var(--color-tint);
}
.channel-tabs >>> .van-tabs__nav--line {
  padding-bottom: 0;
}
.channel-tabs >>> .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
.channel-tabs >>> .hamberge-btn {
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
.channel-tabs >>> .hamberge-btn img {
  width: 100%;
  height: 100%;
}
.channel-tabs >>> .hamberge-btn::before {
  content: "";
  position: absolute;
  left: 0;
  width: 2px;
  height: 100%;
  background-image: url(~@/assets/img/home/gradient-gray-line.png);
  background-size: contain;
}
</style>
