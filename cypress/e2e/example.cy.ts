// https://on.cypress.io/api

describe('Check project root', () => {
  it('Check expense section', () => {
    cy.visit('/')
    cy.contains('h1', 'Lista de egresos')
  })
})
