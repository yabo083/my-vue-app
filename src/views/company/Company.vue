<template>
  <div class="company-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="companyInfoList" style="width: 100%" height="500px">
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
            @click="deleteInfo(scope.row.infoId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
    <el-form :model="currentInfo" ref="infoForm" label-width="80px">
      <el-form-item label="公司信息" prop="infoContent">
        <el-input v-model="currentInfo.infoContent"></el-input>
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
    const companyInfoList = ref([]); // 公司信息列表
    const tableLabel = reactive([
      { label: "信息ID", prop: "infoId" },
      { label: "公司信息", prop: "infoContent" },
      { label: "创建时间", prop: "createTime" },
      { label: "更新用户", prop: "updateUser" },
      { label: "更新时间", prop: "updateTime" },
    ]);
    const dialogVisible = ref(false);
    const dialogTitle = ref("");
    let currentInfo = reactive({});

    // 获取公司信息列表
    const getCompanyInfoList = async () => {
      const res = await api.getCompanyInfoList();
      companyInfoList.value = res;
    };

    // 新增公司信息
    const handleAdd = () => {
      dialogTitle.value = "新增公司信息";
      dialogVisible.value = true;
      Object.keys(currentInfo).forEach((key) => delete currentInfo[key]);
    };

    // 编辑公司信息
    const handleEdit = (info) => {
      dialogTitle.value = "编辑公司信息";
      dialogVisible.value = true;
      Object.assign(currentInfo, info);
    };

    // 提交表单
    const submitForm = async () => {
      if (currentInfo.infoId) {
        await api.updateCompanyInfo(currentInfo);
      } else {
        await api.addCompanyInfo(currentInfo);
      }
      dialogVisible.value = false;
      getCompanyInfoList();
    };

    // 删除公司信息
    const deleteInfo = async (id) => {
      await api.deleteCompanyInfo(id);
      getCompanyInfoList();
    };

    // 重置表单
    const resetForm = () => {
      Object.keys(currentInfo).forEach((key) => delete currentInfo[key]);
      dialogVisible.value = false;
    };

    onMounted(() => {
      getCompanyInfoList();
    });

    return {
      companyInfoList,
      tableLabel,
      dialogVisible,
      dialogTitle,
      currentInfo,
      getCompanyInfoList,
      handleAdd,
      handleEdit,
      submitForm,
      deleteInfo,
      resetForm,
    };
  },
};
</script>

<style scoped>
.company-header {
  margin-bottom: 20px;
}
</style>
