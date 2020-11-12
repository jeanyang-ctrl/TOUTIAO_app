<template>
  <nav-bar class="home-nav">
    <!-- <template v-slot:left>
      </template> -->
    <template v-slot:center>
      <div>bilibili购物街</div>
    </template>
    <!-- <template v-slot:right>
      </template> -->
  </nav-bar>
  <swiper>
  </swiper>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/common/navbar/NavBar.vue";
import Swiper from "@/components/common/autoswiper/Swiper.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
