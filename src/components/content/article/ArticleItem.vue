<template>
  <div class="home-article-item van-multi-ellipsis--l2">
    <van-cell>
      <template #title>
        <div class="title">{{ article.title }}</div>
      </template>
      <template #label>
        <div class="label">
          <div
            v-if="article.cover.type === 3 || article.cover.type === 2"
            class="cover-wrap"
          >
            <div
              class="cover-item"
              v-for="(img, index) in article.cover.images"
              :key="index"
            >
              <van-image width="100" height="100" :src="img" fit="cover" />
            </div>
          </div>
          <div>
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate }}</span>
          </div>
        </div>
      </template>
      <template #default>
        <van-image
          v-if="article.cover.type === 1"
          width="100"
          height="100"
          :src="article.cover.images[0]"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.home-article-item >>> .titlt {
  font-size: 32px;
  color: #3a3a3a;
}
.home-article-item >>> span {
  margin-right: 25px;
  font-size: 22px;
  color: #b4b4b4;
}
.home-article-item >>> .cover-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-article-item >>> .cover-item {
  flex: 1;
}
.home-article-item >>> .cover-item {
  padding-right: 4px;
}
.home-article-item >>> .cover-item:last-child {
  padding-right: 0;
}
.home-article-item >>> .cover-item img {
  width: 100%;
  height: 146px;
}
</style>
