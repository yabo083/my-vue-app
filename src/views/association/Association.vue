<template>
  <div class="association-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="associationList" style="width: 100%" height="500px">
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
            @click="deleteAssociation(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 新增关联的模态框 -->
  <el-dialog title="新增关联" v-model="addDialogVisible" width="40%">
    <el-form
      :model="newAssociation"
      ref="addAssociationForm"
      label-width="80px"
    >
      <el-form-item label="选择栏目" prop="selectedCategoryDtoList">
        <el-select
          v-model="newAssociation.selectedCategoryDtoList"
          placeholder="请选择"
          @change="handleCategoryChange"
          value-key="categoryId"
        >
          <el-option
            v-for="item in categoryList.value"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择文章" prop="selectedArticleDtoList">
        <el-select
          v-model="newAssociation.selectedArticleDtoList"
          multiple
          placeholder="请选择"
          value-key="articleId"
        >
          <el-option
            v-for="item in articleList.value"
            :key="item.articleId"
            :label="item.title"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetAddForm">取 消</el-button>
      <el-button type="primary" @click="addAssociation">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 编辑关联的模态框 -->
  <el-dialog title="编辑关联" v-model="editDialogVisible" width="40%">
    <el-form
      :model="currentAssociation"
      ref="editAssociationForm"
      label-width="80px"
    >
      <el-form-item label="选择栏目" prop="selectedCategoryDtoList">
        <el-select
          v-model="currentAssociation.selectedCategoryDtoList"
          placeholder="请选择"
          value-key="categoryId"
        >
          <el-option
            v-for="item in categoryList.value"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择文章" prop="selectedArticleDtoList">
        <el-select
          v-model="currentAssociation.selectedArticleDtoList"
          placeholder="请选择"
          value-key="articleId"
        >
          <el-option
            v-for="item in articleList.value"
            :key="item.articleId"
            :label="item.title"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetEditForm">取 消</el-button>
      <el-button type="primary" @click="updateAssociation">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import api from "../../api/api.js";

export default {
  setup() {
    const addDialogVisible = ref(false);
    const editDialogVisible = ref(false);
    const newAssociation = reactive({
      selectedCategoryDtoList: [],
      selectedArticleDtoList: [],
    });
    const currentAssociation = reactive({
      id: null,
      selectedCategoryDtoList: [],
      selectedArticleDtoList: [],
    });
    let categoryList = reactive([]);
    let articleList = reactive([]);
    const associationList = ref([]);
    const tableLabel = reactive([
      { label: "关联ID", prop: "id" },
      { label: "栏目名称", prop: "categoryDto.categoryName" },
      { label: "文章标题", prop: "articleDto.title" },
    ]);

    // 获取关联列表
    const getAssociationList = async () => {
      const res = await api.getAssociationList();
      associationList.value = res;
    };

    // 获取所有可用的栏目
    const getAllAvailableCategory = async () => {
      const res = await api.getAllAvailableCategory();
      categoryList.value = res;
      console.log(categoryList.value);
    };

    // 获取所有可用的文章
    const getAllAvailableArticle = async (categoryId) => {
      const res = await api.getAllAvailableArticle(categoryId);
      articleList.value = res;
    };

    // 新增关联
    const handleAdd = () => {
      addDialogVisible.value = true;
    };

    // 编辑关联
    const handleEdit = (association) => {
      console.log(association);
      editDialogVisible.value = true;
      currentAssociation.id = association.id;
      currentAssociation.selectedCategoryDtoList = association.categoryDto;
      currentAssociation.selectedArticleDtoList = association.articleDto;
      console.log(currentAssociation);
    };

    // 删除关联
    const deleteAssociation = async (id) => {
      await api.deleteAssociation(id);
      getAssociationList();
    };

    // 提交新增的关联
    const addAssociation = async () => {
      //   console.log(newAssociation);
      // 创建新的数组，包含你需要的对象
      // 确保 selectedCategoryDtoList 是一个数组
      if (!Array.isArray(newAssociation.selectedCategoryDtoList)) {
        newAssociation.selectedCategoryDtoList = [
          newAssociation.selectedCategoryDtoList,
        ];
      }

      // 确保 selectedArticleDtoList 是一个数组
      if (!Array.isArray(newAssociation.selectedArticleDtoList)) {
        newAssociation.selectedArticleDtoList = [
          newAssociation.selectedArticleDtoList,
        ];
      }
      //   console.log(newAssociation);
      await api.addAssociation(newAssociation);
      addDialogVisible.value = false;
      getAssociationList();
    };

    // 提交编辑的关联
    const updateAssociation = async () => {
      console.log(currentAssociation);
      const updatedAssociation = {
        id: currentAssociation.id,
        articleId: currentAssociation.selectedArticleDtoList.articleId,
        categoryId: currentAssociation.selectedCategoryDtoList.categoryId,
      };
      console.log(updatedAssociation);
      await api.updateAssociation(updatedAssociation);
      editDialogVisible.value = false;
      getAssociationList();
    };

    // 重置新增关联的表单
    const resetAddForm = () => {
      Object.keys(newAssociation).forEach((key) => delete newAssociation[key]);
      addDialogVisible.value = false;
    };

    // 重置编辑关联的表单
    const resetEditForm = () => {
      Object.keys(currentAssociation).forEach(
        (key) => delete currentAssociation[key]
      );
      editDialogVisible.value = false;
    };

    // 当用户选择栏目时，获取该栏目下的所有文章
    const handleCategoryChange = async (selectedCategory) => {
      await getAllAvailableArticle(selectedCategory.categoryId);
    };

    onMounted(async () => {
      await getAssociationList();
      await getAllAvailableCategory();
    });

    return {
      addDialogVisible,
      editDialogVisible,
      newAssociation,
      currentAssociation,
      categoryList,
      articleList,
      associationList,
      tableLabel,
      handleAdd,
      handleEdit,
      addAssociation,
      updateAssociation,
      resetAddForm,
      resetEditForm,
      handleCategoryChange,
      deleteAssociation,
    };
  },
};
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
.association-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>