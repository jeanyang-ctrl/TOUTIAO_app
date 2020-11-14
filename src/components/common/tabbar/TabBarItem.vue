<template>
  <!-- <div class="tab-bar-item">
    <img src="../../assets/img/tabbar\home.svg" alt="" />
    <div>首页</div>
  </div>
  <div class="tab-bar-item">
    <img src="../../assets/img/tabbar\home.svg" alt="" />
    <div>首页</div>
  </div>
  <div class="tab-bar-item">
    <img src="../../assets/img/tabbar\home.svg" alt="" />
    <div>首页</div>
  </div> -->
  <div class="tab-bar-item" @click="itemsClick">
    <!-- <div v-if="!isActive" ><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div> -->
    <div v-if="!isActive" class="item-icon"><slot name="item-icon"></slot></div>
    <div v-else class="item-active-icon">
      <slot name="item-active-icon"></slot>
    </div>

    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: false,
    };
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemsClick() {
      // console.log("itemsClick");
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  height: 100px;
  flex: 1;
  /* line-height: 49px; */
}
.tab-bar-item .item-icon img,
.item-active-icon img {
  /* 本来是24px */
  width: 54px;
  height: 54px;
  margin-top: 5px;
  vertical-align: middle;
}

/* .active {
  color: var(--color-high-text);
} */
</style>
