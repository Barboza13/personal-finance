import { mount } from 'cypress/vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
  ],
})

describe('HomeView Test', () => {
  it('Check route', () => {
    mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    cy.get('h1[class="text-3xl"]').contains('Lista de ingresos')
  })
})
