import { createRouter, createWebHistory } from 'vue-router'
import EnderecosView from '../views/EnderecosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EnderecosView',
      component: EnderecosView
    }

  ]
})

export default router
