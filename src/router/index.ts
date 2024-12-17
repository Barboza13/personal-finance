import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import IncomeView from '@views/IncomeView.vue'
import ExpenseView from '@views/ExpenseView.vue'

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
    {
      path: '/expenses',
      name: 'expense',
      component: ExpenseView,
    },
  ],
})

export default router
