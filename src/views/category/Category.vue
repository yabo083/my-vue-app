<template>
  <div class="category-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="categoryList" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        flex="1"
      />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteCategory(scope.row.categoryId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
    <el-form :model="currentCategory" ref="categoryForm" label-width="80px">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="currentCategory.categoryName"></el-input>
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
    const categoryList = ref([]); // 分类列表
    const tableLabel = reactive([
      { label: "分类ID", prop: "categoryId" },
      { label: "分类名称", prop: "categoryName" },
      { label: "创建用户", prop: "createUser" },
      { label: "创建时间", prop: "createTime" },
      { label: "更新用户", prop: "updateUser" },
      { label: "更新时间", prop: "updateTime" },
    ]);
    const dialogVisible = ref(false);
    const dialogTitle = ref("");
    let currentCategory = reactive({});

    // 获取分类列表
    const getCategoryList = async () => {
      const res = await api.getCategoryList();
      categoryList.value = res;
    };

    // 新增分类
    const handleAdd = () => {
      dialogTitle.value = "新增分类";
      dialogVisible.value = true;
      Object.keys(currentCategory).forEach((key) => delete currentCategory[key]);
    };

    // 编辑分类
    const handleEdit = (category) => {
      dialogTitle.value = "编辑分类";
      dialogVisible.value = true;
      Object.assign(currentCategory, category);
    };

    // 提交表单
    const submitForm = async () => {
      if (currentCategory.categoryId) {
        await api.updateCategory(currentCategory);
      } else {
        await api.addCategory(currentCategory);
      }
      dialogVisible.value = false;
      getCategoryList();
    };

    // 删除分类
    const deleteCategory = async (id) => {
      await api.deleteCategory(id);
      getCategoryList();
    };

    // 重置表单
    const resetForm = () => {
      Object.keys(currentCategory).forEach(
        (key) => delete currentCategory[key]
      );
      dialogVisible.value = false;
    };

    onMounted(() => {
      getCategoryList();
    });

    return {
      categoryList,
      tableLabel,
      dialogVisible,
      dialogTitle,
      currentCategory,
      getCategoryList,
      handleAdd,
      handleEdit,
      submitForm,
      deleteCategory,
      resetForm,
    };
  },
};
</script>

<style scoped>
.category-header {
  margin-bottom: 20px;
}
</style>
