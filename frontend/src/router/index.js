import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/components/Feed.vue'
import Login from '@/components/Login.vue'


const routes = [{
    name: 'Login',
    path: '/',
    component: Login
}, {
    name: 'Feed',
    path: '/feed',
    component: Feed
}]

const router = createRouter({
    history: createWebHistory,
    routes
})


export default router