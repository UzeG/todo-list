import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: 'index'
    },
    {
        name: 'index',
        path: '/index',
        component: () => import('../components/TodoList.vue'),
        // children: [
        //     {
        //         name: 'edit',
        //         path: 'edit',
        //         component: () => import('../components/Dialog.vue')
        //     }
        // ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

/* router.beforeEach((to, from, next) => {
    next();
})

router.beforeResolve(async to => { })

router.afterEach((to, from, failure) => { }) */

export default router;