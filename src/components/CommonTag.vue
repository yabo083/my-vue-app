<!-- CommonTab.vue -->
<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.path"  
      :closable="tag.title !== '后台首页'"
      :disable-transitions="false"
      :effect="route.name === tag.path ? 'dark' : 'plain'"
      size="large"
      round
      class="animated-tag"
      @close="removeTag(tag.path)"
      @click="goToTag(tag.path)"
    >
      {{ tag.title }}
    </el-tag>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useTagStore } from "../store/index.js";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const tagStore = useTagStore();
    const router = useRouter();
    const route = useRoute();

    watchEffect(() => {
      // console.log(route.meta.title);
      tagStore.addTag({ path: route.name, title: route.meta.title });
      // console.log(tagStore.tags);
    });

    const removeTag = (path) => {
      // console.log(tag); // link => tag.name
      // console.log(tagStore.tags);
      tagStore.removeTag(path);
    }

    const goToTag = (path) => {
      router.push({ name: path });
    }

    return {
      tags: tagStore.tags,
      removeTag,
      goToTag,
      route,
    };
  },
};
</script>

<style lang="less" scoped>
.tags{
  padding: 20px;
  width: 100%;

  .el-tag{
    margin: 15px;
    cursor: pointer;//鼠标移上去变成小手
  }
}

.animated-tag {
  animation: scale 0.3s ease-in-out;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
