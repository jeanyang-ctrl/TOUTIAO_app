<template>
   <tab-bar>
    <tab-bar-item   path ='/home'  activeColor="pink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/home.svg" alt="" />
      </template>
      <template v-slot:item-active-icon>
        <img src="@/assets/img/tabbar/home_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item >
    <tab-bar-item path ='/categories' activeColor="pink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/category.svg" alt="" />
      </template>
      <template v-slot:item-active-icon>
        <img src="@/assets/img/tabbar/category_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>分类</div>y
      </template>
    </Tab-Bar-Item>
    <tab-bar-item path ='/cart' activeColor="pink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/shopcart.svg" alt="" />
      </template>
      <template v-slot:item-active-icon>
        <img src="@/assets/img/tabbar/shopcart_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item >
    <tab-bar-item  path ='/profile' activeColor="pink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/profile.svg" alt="" />
      </template>
      <template v-slot:item-active-icon>
        <img src="@/assets/img/tabbar/profile_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>主页</div>
      </template>
    </tab-bar-item >
  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'MainTabBar',
  components: {
      TabBar,
    TabBarItem,
  }
}
</script>


