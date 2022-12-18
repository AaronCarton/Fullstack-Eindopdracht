///<reference types="cypress" />

// beforeAll(() => {
//   cy.request({

//   })
// })

describe('Check if user can create an account(register).', () => {
  it('Should be able to register', () => {
    cy.visit(`${Cypress.env('APP_URL')}/auth/register`)
  })

  it('Should be able to fill in the form', () => {
    cy.get('[data-cy="name"]').type(Cypress.env('USER'))
    cy.get('[data-cy="email"]').type(Cypress.env('EMAIL'))
    cy.get('[data-cy="password"]').type(Cypress.env('PASSWORD'))

    cy.get('[data-cy="register"]').click()
  })
})
