<template>
  <div class="link-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="linkList" style="width: 100%" height="500px">
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
            @click="deleteLink(scope.row.linkId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
    <el-form :model="currentLink" ref="linkForm" label-width="80px">
      <el-form-item label="链接名称" prop="linkName">
        <el-input v-model="currentLink.linkName"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input v-model="currentLink.linkUrl"></el-input>
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
    const linkList = ref([]); // 友链列表
    const tableLabel = reactive([
      { label: "链接ID", prop: "linkId" },
      { label: "链接名称", prop: "linkName" },
      { label: "链接地址", prop: "linkUrl" },
      { label: "创建用户", prop: "createUser"},
      { label: "创建时间", prop: "createTime" },
      { label: "更新用户", prop: "updateUser" },
      { label: "更新时间", prop: "updateTime" },
    ]);
    const dialogVisible = ref(false);
    const dialogTitle = ref("");
    let currentLink = reactive({});

    // 获取友链列表
    const getLinkList = async () => {
      const res = await api.getLinkList();
      // console.log("看到这条信息说明你已经成功获取到了友链列表");
      // console.log(res);
      // console.log("出来了吗");
      linkList.value = res;
      // if (res.code === 200) {
      //   console.log(res.data);
      // }
    };

    // 新增友链
    const handleAdd = () => {
      console.log(currentLink); // 使用一个空对象重置 currentLink 对象的所有属性
      // Object.assign(currentLink, {});
      dialogTitle.value = "新增友链"; // 设置模态框的标题为 "新增友链"
      dialogVisible.value = true; // 设置模态框的可见性为 true，这将会使模态框显示出来
    };

    // 编辑友链
    const handleEdit = (link) => {
      dialogTitle.value = "编辑友链";
      dialogVisible.value = true;
      Object.assign(currentLink, link);
      console.log(currentLink);
    };

    // 提交表单
    const submitForm = async () => {
      if (currentLink.linkId) {
        await api.updateLink(currentLink);
      } else {
        await api.addLink(currentLink);
      }
      dialogVisible.value = false;
      getLinkList();
    };

    // 删除友链
    const deleteLink = async (id) => {
      await api.deleteLink(id);
      getLinkList();
    };

    // 重置表单
    const resetForm = () => {
      // Object.keys(currentLink).forEach((key) => {
      //   currentLink[key] = "";
      // });
      Object.keys(currentLink).forEach(key => delete currentLink[key]);
      console.log(currentLink);
      dialogVisible.value = false;
    };

    onMounted(() => {
      // 组件创建后获取友链列表
      getLinkList();
      // console.log(linkList.value);
    });

    return {
      linkList,
      tableLabel,
      dialogVisible,
      dialogTitle,
      currentLink,
      getLinkList,
      handleAdd,
      handleEdit,
      submitForm,
      deleteLink,
      resetForm,
    };
  },
};
</script>

<style scoped>
.link-header {
  margin-bottom: 20px;
}
</style>
