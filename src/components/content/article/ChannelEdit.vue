<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="title-text">我的频道</span>
      </template>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        text="编辑"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :column-num="4" class="my-grid">
      <van-grid-item
        v-for="(myChannel, index) in mychannels"
        :key="index"
        class="grid-item"
        @click="toggleChannel(myChannel, index)"
      >
        <template #icon
          ><van-icon
            v-show="isEdit && !fixedChannels.includes(myChannel.id)"
            name="clear"
          ></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: myactive === index }"
            >{{ myChannel.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid :column-num="4" class="recommend-grid" :gutter="10">
      <van-grid-item
        v-for="(myChannel, index) in RecmdChannels"
        :key="index"
        icon="plus"
        :text="myChannel.name"
        class="grid-item"
        @click="onAddChannel(myChannel)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/network/home/channel";

import { mapState } from "vuex";

import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  data() {
    return {
      allchannels: [],
      isEdit: false, //控制编辑状态
      fixedChannels: [0],
    };
  },
  props: {
    // 声明并接收父组件的频道列表数据并遍历显示
    mychannels: {
      type: Array,
      required: true,
    },
    myactive: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.getRecmdChannels();
  },
  computed: {
    RecmdChannels() {
      return this.allchannels.filter((channel) => {
        return !this.mychannels.find((mychannel) => {
          return mychannel.id === channel.id;
        });
      });
    },
    ...mapState(["user"]),
  },
  methods: {
    async getRecmdChannels() {
      try {
        const { data } = await getAllChannels();
        console.log(data);
        this.allchannels = data.data.channels;
      } catch (err) {
        this.$toast("获取数据失败");
      }
    },
    async onAddChannel(mychannel) {
      this.mychannels.push(mychannel);
      if (this.user) {
        //用户登录状态
        try {
          const { data } = await addUserChannel({
            id: mychannel.id, // 频道ID
            seq: this.mychannels.length, // 序号
          });
          console.log(data.data.channels);
        } catch (err) {
          this.$toast("保存失败 稍后重试");
        }
      } 
      else {
        //用户未登录状态下存储到本地
        setItem("TOUTIAO_CHANNELS", this.mychannels);
      }
    },
    async onDelChannel(mychannel) {
      //用户登录状态
      try {
        if (this.user) {
          await deleteUserChannel(
            mychannel.id // 频道ID
          );
        } else {
          //存储到本地
          setItem("TOUTIAO_CHANNELS", this.mychannels);
        }
      } catch (err) {
        this.$toast("删除失败 稍后重试");
      }
    },
    toggleChannel(myChannel, index) {
      if (this.isEdit && !this.fixedChannels.includes(myChannel.id)) {
        this.mychannels.splice(index, 1);
        this.onDelChannel(myChannel);
        if (index <= this.myactive) {
          this.$emit("update-active", this.myactive - 1, true);
        }
      } else {
        this.$emit("update-active", index, false);
      }
    },
  },
};
</script>
<style scoped>
/* ::v-deep  */
.channel-edit {
  padding: 85px 0;
}
::v-deep .van-cell__title .title-text {
  color: #333;
  font-size: 32px;
}
::v-deep .my-grid .text {
  font-size: 22px;
  color: #222;
  margin-top: 4px !important;
}
::v-deep .van-cell__title {
  text-align: left;
}
::v-deep .edit-btn {
  width: 104px;
  height: 48px;
  font-size: 16px !important;
  color: #f85959;
  border: 1px solid #f85959;
}
::v-deep .van-button--danger {
  background-color: #fff;
}
::v-deep .grid-item {
  width: 140px;
  height: 86px;
}
::v-deep .grid-item .van-grid-item__content {
  white-space: nowrap;
  background-color: #f4f5f6;
}
::v-deep .van-badge__wrapper {
  position: unset;
}
::v-deep .grid-item .van-grid-item__text {
  font-size: 22px;
  color: #222;
  margin-top: 4px !important;
}
::v-deep .my-grid .grid-item .van-icon-clear {
  position: absolute;
  top: -5px;
  right: 0px;
  z-index: 2;
  color: #cacaca;
  font-size: 15px;
}
::v-deep .recommend-grid .grid-item {
  width: 140px;
  height: 86px;
}
::v-deep .recommend-grid .grid-item .van-grid-item__content {
  flex-direction: row;
  /* vertical-align:middle; */
}
::v-deep .recommend-grid .grid-item .van-icon-plus {
  font-size: 22px;
  line-height: 22px;
  margin-right: 6px;
}
::v-deep .van-grid-item__icon + .van-grid-item__text {
  /* 文字和图片对不齐是因为文字有个上外边距 */
  margin-top: 0;
}
::v-deep .active {
  color: red !important;
}
</style>
