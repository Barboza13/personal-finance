describe('Check if the income is saved.', () => {
  it('Check form elements.', () => {
    const name: string = 'Test'
    const amount: string = '100000'
    const date: string = '2021-01-01'

    cy.visit('/incomes')
    cy.get('form').should('exist')
    cy.get('input[name="name"]').should('exist').type(name)
    cy.get('input[name="amount"]').should('exist').type(amount)
    cy.get('input[name="date"]').should('exist').type(date)
    cy.get('button[type="submit"]').should('exist').click()

    // Check if the form inputs is cleared.
    cy.get('input[name="name"]').should('have.value', '')
    cy.get('input[name="amount"]').should('have.value', '0')
    cy.get('input[name="date"]').should('have.value', '')
  })
})
