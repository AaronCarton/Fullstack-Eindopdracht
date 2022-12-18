///<reference types="cypress" />

// beforeAll(() => {
//   cy.request({

//   })
// })

describe('Check if user can logout.', () => {
  it('Should be able to logout if logged in', () => {
    cy.visit(`${Cypress.env('APP_URL')}/`)
    if (cy.get('[data-cy="account-name"]').should('be.visible')) {
      cy.get('[data-cy="account"]').click()
      cy.get('[data-cy="logout"]').click()
    }
  })
})
