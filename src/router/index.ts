import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/template',
      component: () => import('@/template/index.vue'),
    },
    {
      path: '/llm',
      component: () => import('@/presentations/llm/index.vue'),
    },
  ],
})

export default router
