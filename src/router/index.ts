import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import IncomeView from '@views/IncomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/incomes',
      name: 'income',
      component: IncomeView,
    },
  ],
})

export default router
