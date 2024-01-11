<template>
  <div class="article-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="articleList" style="width: 100%" height="500px">
      <!-- <div class="test"> -->
        <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          flex="1"
        />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteArticle(scope.row.articleId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      <!-- </div> -->
    </el-table>
  </div>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
    <el-form :model="currentArticle" ref="articleForm" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="currentArticle.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input type="textarea" v-model="currentArticle.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import api from "../../api/api.js";

export default {
  setup() {
    const articleList = ref([]); // 文章列表
    const tableLabel = reactive([
      { label: "文章ID", prop: "articleId" },
      { label: "文章标题", prop: "title" },
      { label: "文章内容", prop: "content" },
      { label: "作者", prop: "author" },
      { label: "创建用户", prop: "createUser" },
      { label: "创建时间", prop: "createTime" },
      { label: "更新用户", prop: "updateUser" },
      { label: "更新时间", prop: "updateTime" },
    ]);
    const dialogVisible = ref(false);
    const dialogTitle = ref("");
    let currentArticle = reactive({});

    // 获取文章列表
    const getArticleList = async () => {
      const res = await api.getArticleList();
      res.forEach((article) => {
        article.content = truncate(article.content);
      }); // 截取文章内容, 避免表格过长
      articleList.value = res;
    };

    // 新增文章
    const handleAdd = () => {
      dialogTitle.value = "新增文章";
      dialogVisible.value = true;
    };

    // 编辑文章
    const handleEdit = (article) => {
      dialogTitle.value = "编辑文章";
      dialogVisible.value = true;
      Object.assign(currentArticle, article);
    };

    // 提交表单
    const submitForm = async () => {
      if (currentArticle.articleId) {
        await api.updateArticle(currentArticle);
      } else {
        await api.addArticle(currentArticle);
      }
      dialogVisible.value = false;
      getArticleList();
    };

    // 删除文章
    const deleteArticle = async (id) => {
      await api.deleteArticle(id);
      getArticleList();
    };

    // 重置表单
    const resetForm = () => {
      Object.keys(currentArticle).forEach((key) => delete currentArticle[key]);
      dialogVisible.value = false;
    };

    onMounted(() => {
      getArticleList();
    });

    const truncate = (value) => {
      if (!value) return "";
      value = value.toString();
      return value.length > 50 ? value.slice(0, 35) + "……" : value;
    };

    return {
      articleList,
      tableLabel,
      dialogVisible,
      dialogTitle,
      currentArticle,
      getArticleList,
      truncate,
      handleAdd,
      handleEdit,
      submitForm,
      deleteArticle,
      resetForm,
    };
  },
};
</script>

<style scoped>
.article-header {
  margin-bottom: 20px;
}
</style>
