import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import IncomeView from '@views/IncomeView.vue'
import ExpenseView from '@views/ExpenseView.vue'
import ChartView from '@views/ChartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/incomes/:index?',
      name: 'incomes',
      component: IncomeView,
    },
    {
      path: '/expenses/:index?',
      name: 'expenses',
      component: ExpenseView,
    },
    {
      path: '/charts',
      name: 'charts',
      component: ChartView,
    },
  ],
})

export default router
