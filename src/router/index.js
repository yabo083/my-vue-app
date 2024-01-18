import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        redirect: '/home',
        meta: {
            title: '后台首页'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/Home.vue'),
                meta: {
                    title: '后台首页'
                }
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/User.vue'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: '/link',
                name: 'link',
                component: () => import('../views/link/Link.vue'),
                meta: {
                    title: '友链管理'
                }
            },
            {
                path: '/article',
                name: 'article',
                component: () => import('../views/article/Article.vue'),
                meta: {
                    title: '文章管理'
                }
            },
            {
                path: '/company',
                name: 'company',
                component: () => import('../views/company/Company.vue'),
                meta: {
                    title: '公司信息管理'
                }
            },
            {
                path: '/category',
                name: 'category',
                component: () => import('../views/category/Category.vue'),
                meta: {
                    title: '栏目管理'
                }
            },
            {
                path: '/association', 
                name: 'association',
                component: () => import('../views/association/Association.vue'),
                meta: {
                    title: '关联管理'
                }
            },
            {
                path: '/other',
                name: 'other',
                component: () => import('../views/other/Other.vue'),
                meta: {
                    title: '其他设置'
                },
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        component: () => import('../views/other/Website.vue'),
                        meta: {
                            title: '网站设置'
                        }
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        component: () => import('../views/other/Notice.vue'),
                        meta: {
                            title: '公告设置'
                        }
                    },
                ]
            }
        ]
    },
    // Add your other routes here

    {
        path: '/front',
        name: 'front',
        component: () => import('../views/front/Front.vue'),
        meta: {
            title: '前台首页'
        },
    },
    {
        path: '/user/login',
        name: 'login',
        component: () => import('../views/login/Login.vue'),
        meta: {
            title: '用户登录'
        },
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
