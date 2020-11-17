<template>
  <h2>问答</h2>
  <van-cell is-link @click="showPopup">{{ show }}展示弹出层</van-cell>
  <van-popup
    v-model:show="show"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }"
    >内容</van-popup
  >
</template>
<script>
export default {
  name: "Cart",
  data() {
    return {
      show: false,
    };
  },
  // props:{
  //     show: boolean,
  //   },
  methods: {
    showPopup() {
      console.log("var展示不出来");
      this.show = true;
      console.log(this.show);
    },
  },
};
</script>

<style scoped></style>
