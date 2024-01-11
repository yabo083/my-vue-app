<template>
  <el-aside :width="sidebar.isCollapsed ? '64px' : '200px'"
    ><el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="sidebar.isCollapsed"
    >
      <h3>{{ sidebar.isCollapsed ? "后台" : "后台管理" }}</h3>
      <!-- 这里item打错、不打:,都会导致标签项同时亮起 -->
      <el-menu-item
        :index="item.label"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon" />
        <span>{{ item.label }}</span>
      </el-menu-item>

      <!-- 导航器一 -->
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon" />
          <span>{{ item.label }}</span>
        </template>

        <!-- 第一组 -->
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon" />
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useSidebarStore } from "../store/index.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    // 侧边栏列表
    const list = [
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        // url: "UserManage/UserManage",
      },
      {
        path: "/link",
        name: "link",
        label: "友链管理",
        icon: "link",
        // url: "LinkManage/LinkManage",
      },
      {
        path: "/company",
        name: "company",
        label: "公司信息管理",
        icon: "icon-company",
      },
      {
        path: "/article",
        name: "article",
        label: "文章管理",
        icon: "icon-article",
      },
      
      {
        path: "/category",
        name: "category",
        label: "栏目管理",
        icon: "icon-category",
      },
      {
        path: "/association",
        name: "association",
        label: "关联管理",
        icon: "icon-association",
      },
      {
        label: "其他",
        icon: "more",
        path: "/other",
        name: "other",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            // url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            // url: "Other/PageTwo",
          },
        ],
      },
    ];

    const router = useRouter();

    const noChildren = () => {
      return list.filter((item) => !item.children);
    };

    const hasChildren = () => {
      return list.filter((item) => item.children);
    };

    const sidebar = useSidebarStore();

    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
    };

    return {
      noChildren,
      hasChildren,
      sidebar,
      clickMenu,
    };
  },
};
</script>

<style lang="less" scoped>
.el-aside,
.el-menu {
  transition: all 0.3s ease;
}
.el-menu-item {
  transition: all 0.3s ease;
}
.icons {
  width: 18px;
  height: 18px;
}
.el-menu[aria-expanded="false"] .el-menu-item {
  opacity: 0;
  transform: translateX(-20px);
}
.el-menu {
  border-right: none;
  h3{
    line-height: 48px;
    text-align: center;
    color: #fff;
  }
}
</style>
