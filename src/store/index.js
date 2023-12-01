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