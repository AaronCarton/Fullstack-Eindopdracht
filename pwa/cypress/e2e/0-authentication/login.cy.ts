///<reference types="cypress" />

// beforeAll(() => {
//   cy.request({

//   })
// })

describe('Check if user can login.', () => {
  it('Should be able to logout if logged in', () => {
    cy.visit(`${Cypress.env('APP_URL')}/`)
    if (cy.get('[data-cy="account-name"]').should('be.visible')) {
      cy.get('[data-cy="account"]').click()
      cy.get('[data-cy="logout"]').click()
    }
  })

  it('Should be able to login', () => {
    if (cy.get('[data-cy="login-button"]').should('be.visible')) {
      cy.get('[data-cy="account"]').click()

      cy.get('[data-cy="email"]').type(Cypress.env('EMAIL'))
      cy.get('[data-cy="password"]').type(Cypress.env('PASSWORD'))

      cy.get('[data-cy="login"]').click()
    }
  })
})
