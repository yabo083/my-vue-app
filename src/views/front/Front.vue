<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    style="justify-content: center"
  >
    <el-menu-item
      v-for="(item, index) in categoryList"
      :index="index.toString()"
      :key="item.categoryId"
      @click="getAllConnectedArticle(item.categoryId)"
    >
      {{ item.categoryName }}
    </el-menu-item>
    <el-menu-item
      ><router-link :to="{ name: 'home' }">后台</router-link></el-menu-item
    >
  </el-menu>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li
      v-for="article in articleList"
      :key="article.articleId"
      class="infinite-list-item"
    >
      <h2
        style="
          font-size: 38px;
          text-align: center;
          margin-bottom: 10px;
          margin-top: 20px;
        "
      >
        {{ article.title }}
      </h2>
      <h3
        style="
          font-size: 25px;
          text-align: center;
          margin-bottom: 10px;
          margin-top: 20px;
        "
      >
        {{ article.author == null ? "佚名" : article.author }}
      </h3>
      <div
        class="card"
        style="display: flex; justify-content: center; align-items: center"
      >
        <el-card style="margin-bottom: 20px; width: 70%">
          <vue-showdown :markdown="article.content" flavor="github" xhtmlOut />
        </el-card>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import api from "../../api/api.js";
import { VueShowdown } from 'vue-showdown';


export default {
  components: {
    VueShowdown,
  },
  setup() {
    const categoryList = ref([]);
    const articleList = ref([]);

    const getAllAvailableCategory = async () => {
      const res = await api.getAllAvailableCategory();
      categoryList.value = res;
      console.log(categoryList.value);
    };

    const getAllConnectedArticle = async (categoryId) => {
      const res = await api.getAllConnectedArticle(categoryId);
      articleList.value = res;
      console.log(articleList.value);
    };

    const count = ref(0);
    const load = () => {
      count.value += 2;
    };

    onMounted(() => {
      getAllAvailableCategory();
    });

    return {
      categoryList,
      articleList,
      load,
      count,
      getAllConnectedArticle,
    };
  },
};
</script>

<style scoped lang="less"></style>
