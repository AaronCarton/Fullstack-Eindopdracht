///<reference types="cypress" />

// beforeAll(() => {
//   cy.request({

//   })
// })

describe('Check if user can create an takeaway order.', () => {
  it('Should be able to go to pizza overview', () => {
    cy.visit(`${Cypress.env('APP_URL')}/`)
    cy.get('[data-cy="takeaway-button"]').click()
  })

  it('Should be able to select a pizza', () => {
    cy.get('[data-cy="pizza-overview"]').should('be.visible')
    cy.get('[data-cy="add"]').first().click()
  })
  it('Should be able to change pizza type and size to large and cheesy crust', () => {
    cy.get('[data-cy="pizza-customize"]').should('be.visible')
    cy.get('[data-cy="pizza-type"]').last().click()
    cy.get('[data-cy="pizza-size"]').last().click()
  })
  it('Should be able to add extra cheese', () => {
    cy.get('[data-cy="pizza-topping"]').eq(1).click()
  })
  it('Should be able to add the custom pizza & checkout', () => {
    cy.get('[data-cy="add-custom"]').click()
    if (cy.get('[data-cy="cart-button"]').should('be.visible')) {
      cy.get('[data-cy="cart-button"]').click()
      cy.get('[data-cy="checkout-cartbtn"]').click()
    } else {
      cy.get('[data-cy="checkout-cart"]').click()
    }
  })
  it('Should be able to choose a payment methode & pay', () => {
    cy.get('[data-cy="bancontact"]').click()
    cy.get('[data-cy="pay-button"]').click()
  })
})
