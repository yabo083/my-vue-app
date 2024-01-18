<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" @click="toggleSidebar">
        <el-icon size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item
        v-if="currentRoute.name === 'home'"
        :to="currentRoute.path"
      >
        {{ currentRoute.meta.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-else
        v-for="(route, i) in matchedRoutes"
        :key="i"
        :to="route.path"
      >
        {{ route.meta.title }}
      </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="avatar" :src="getImgSrc('avatar')" alt=" " />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link :to="{name: 'front'}">前台</router-link>
            </el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useSidebarStore } from "../store/index.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const getImgSrc = (user) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };

    const sidebar = useSidebarStore();

    const route = useRoute();

    const matchedRoutes = ref([]);

    const currentRoute = ref([]);

    watchEffect(() => {
      matchedRoutes.value = route.matched;
      currentRoute.value = route;
    });

  

    return {
      getImgSrc,
      toggleSidebar: sidebar.toggle,
      matchedRoutes,
      currentRoute,
    };
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}

.r-content {
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    margin-left: 10px;
    color: #fff;
  }
}

.bread {
  color: #fff !important;
  font-size: 14px;
}
// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
