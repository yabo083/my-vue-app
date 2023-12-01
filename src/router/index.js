import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/User.vue')
            },
        ]
    },
    // Add your other routes here
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
