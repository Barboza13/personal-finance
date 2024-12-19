import HomeView from '@views/HomeView.vue'

describe('HomeView', () => {
  it('Check project root', () => {
    cy.mount(HomeView, { props: { msg: 'Hello Cypress' } })
    cy.contains('h1', 'Lista de ingresos')
  })
})
