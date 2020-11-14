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
  <rec-view/>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/common/navbar/NavBar.vue";
import Swiper from "@/components/common/autoswiper/Swiper.vue";
import RecView from "@/views/home/childcpns/RecView.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    RecView
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
