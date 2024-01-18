<template>
  <div class="dark" >
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
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: hidden">
      <li
        v-for="article in articleList"
        :key="article.articleId"
        class="infinite-list-item"
      >
        <div
          class="card1"
          style="display: flex; justify-content: center; align-items: center"
        >
          <el-card class="card" style="margin-bottom: 20px; width: 70%">
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
                margin-bottom: 20px;
                margin-top: 20px;
              "
            >
              <span class="line">
                {{ article.author == null ? "佚名" : article.author }}
              </span>
            </h3>
            <vue-showdown
              :markdown="article.content"
              flavor="github"
              xhtmlOut
            />
          </el-card>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import api from "../../api/api.js";
import { VueShowdown } from "vue-showdown";

export default {
  components: {
    VueShowdown,
  },
  setup() {
    const categoryList = ref([]);
    const articleList = ref([]);

    const getAllAvailableCategory = async () => {
      const res = await api.getAllAvailableCategory();
      categoryList.value = [];
      for (let category of res) {
        const articles = await api.getAllConnectedArticle(category.categoryId);
        if (articles.length > 0) {
          categoryList.value.push(category);
        }
      }
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

<style scoped lang="less">
.dark {
  background-image: url("../../assets/images/1.png");
  // background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
  background-color: #464646;
  .el-menu-demo {
    background-color: #464646;
  }
  .el-menu-demo .el-menu-item.is-active {
    background-color: #464646;
    font-weight: bold;
    font-size: medium;
  }

  .infinite-list {
    .infinite-list-item {
      margin-top: 10px;
      .card1 {
        .card {
          background:linear-gradient(135deg, #CE9FFC 0%,#7367F0 100%);
          color: #fae437f3;
          border: #464646;
          h3 {
            .line {
              border-bottom: 2px solid #464646;
              display: inline-block;
              padding-bottom: 5px;
            }
          }
        }
      }
    }
  }
}

@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}
</style>
