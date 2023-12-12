import PostDetailVue from '@/views/posts/PostDetail.vue'
import PostListVue from '@/views/posts/PostList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // root path
    {
      path: '/',
      name: 'home',
      component: PostListVue
    },
    // path to view post
    {
      path: '/post/:id',
      component: PostDetailVue,
    }
  ]
})

export default router
