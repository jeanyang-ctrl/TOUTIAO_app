<template>
  <!-- 侧导航栏 -->
  <div class="search-history">
    <van-cell title="搜索历史" value="内容">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-all-histories')">全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>

    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="delSearshItem(item, idex)"
    >
      <template #title>
        <div>{{ item }}</div>
      </template>
      <template #right-icon>
        <van-icon v-if="isDeleteShow" name="delete" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false,
    };
  },
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    delSearshItem(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
      } else {
        this.$emit("searchItem", item);
      }
    },
  },
};
</script>
<style scoped>
::v-deep .van-cell__title {
  text-align: left;
}
</style>
