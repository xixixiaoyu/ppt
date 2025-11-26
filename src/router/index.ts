import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/design-language-template',
      component: () => import('@/presentations/design-language-template/index.vue'),
    },
    {
      path: '/acp-llm-tutorial',
      component: () => import('@/presentations/acp-llm-tutorial/index.vue'),
    },
    {
      path: '/llm',
      component: () => import('@/presentations/llm/index.vue'),
    },
  ],
})

export default router
