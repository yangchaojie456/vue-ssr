// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [            
            {
                path: '/foo',
                component: () => import('./components/Foo.vue')
            },
            {
                path: '/Bar',
                component: () => import('./components/Bar.vue')
            },
            {
                path: '/Baz',
                component: () => import('./components/Baz.vue')
            },
        ]
    })
}