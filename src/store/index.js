// ../store/index.js
import { defineStore } from 'pinia';

export const useSidebarStore = defineStore({
    id: 'sidebar',
    state: () => ({
        isCollapsed: false,
    }),
    actions: {
        toggle() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
});

export const useTagStore = defineStore({
    id: 'tag',
    state: () => ({
        tags: [
            {
                'path': 'home',
                'title': '后台首页',
            },
        ],
    }),
    actions: {
        addTag(tag) {
            if (tag.title !== '后台首页' && !this.tags.find(t => t.path === tag.path)) {
                this.tags.push(tag);
              }
        },
        removeTag(tag) {
            const index = this.tags.findIndex(t => t.path === tag);  // 修改这里，使用标签的 name 属性来查找标签
            if (index !== -1) {
                this.tags.splice(index, 1);
            }
        }
    },
});