<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteStudent(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action === 'add' ? '新增学生' : '编辑学生'"
    width="40%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser">
      <el-form-item label="姓名">
        <el-input v-model="formUser.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formUser.age" placeholder="请输入年龄" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-input
          v-model="formUser.gender"
          placeholder="请输入性别"
          clearable
        />
      </el-form-item>
      <el-form-item label="编号">
        <el-input
          v-model="formUser.number"
          placeholder="请输入编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          v-model="formUser.address"
          placeholder="请输入地址"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-input
          v-model="formUser.status"
          placeholder="请输入状态"
          clearable
          :default-value="1"
          :default-value-type="Number"
        />
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item> -->
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addOrUpdateStudent" @keyup.enter="addOrUpdateStudent">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "id",
        label: "ID",
      },
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "gender",
        label: "性别",
      },
      {
        prop: "number",
        label: "编号",
        width: "200",
      },
      {
        prop: "address",
        label: "地址",
        width: "200",
      },
      {
        prop: "status",
        label: "状态",
      },
    ]);
    const formUser = reactive({
      name: "",
      age: "",
      gender: "",
      number: "",
      address: "",
      status: "",
    });

    const dialogVisible = ref(false);

    const handleClose = (done) => {
      ElMessageBox.confirm("你确定要关闭这个对话框吗?", "确认信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    const getAllStudent = async () => {
      try {
        const res = await proxy.$api.getAllStudent();
        list.value = res;
      } catch (error) {
        console.error(error);
      }
    };

    const addOrUpdateStudent = async () => {
      try {
        if (action.value === "add") {
          const success = await proxy.$api.addStudent(formUser);
          if (success) {
            // 新增成功，使用el-message显示一个成功的消息
            ElMessage({
              message: "新增成功",
              type: "success",
            });
            getAllStudent();
            dialogVisible.value = false;
          } else {
            // 新增失败，使用el-message显示一个失败的消息
            ElMessage({
              message: "新增失败",
              type: "error",
            });
            dialogVisible.value = false;
          }
        } else {
          console.log(formUser.id);
          const success = await proxy.$api.updateStudent(formUser);
          if (success) {
            // 更新成功，使用el-message显示一个成功的消息
            ElMessage({
              message: "更新成功",
              type: "success",
            });
            getAllStudent();
            dialogVisible.value = false;
          } else {
            // 更新失败，使用el-message显示一个失败的消息
            ElMessage({
              message: "更新失败",
              type: "error",
            });
            dialogVisible.value = false;
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const deleteStudent = async (id) => {
      try {
        const success = await proxy.$api.deleteStudent(id);
        if (success) {
          // 删除成功，使用el-message显示一个成功的消息
          ElMessage({
            message: "删除成功",
            type: "success",
          });
          getAllStudent();
        } else {
          // 删除失败，使用el-message显示一个失败的消息
          ElMessage({
            message: "删除失败",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const action = ref("add");

    const handleEdit = (row) => {
      action.value = "edit";
      dialogVisible.value = true;
      proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
    };

    const handleAdd = () => {
      action.value = "add";
      dialogVisible.value = true;
      resetFormUser();
    };

    // 定义一个函数来重置 formUser 对象
    const resetFormUser = () => {
      Object.keys(formUser).forEach((key) => {
        formUser[key] = "";
      });
    };

    onMounted(() => {
      // getAllStudent();
    });

    return {
      list,
      tableLabel,
      dialogVisible,
      handleClose,
      formUser,
      action,
      addOrUpdateStudent,
      handleEdit,
      deleteStudent,
      handleAdd,
    };
  },
});
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
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
