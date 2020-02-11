/// <reference types="Cypress" />

describe('create portfolio', function() {

    this.beforeEach(() => {
        cy.login()
        cy.visit('/templates/portfolios')
    })

    it(` Templates/Portfolio contains Create Portfolio button, 'My Model Portfolios' title and a search bar`, () => {
        cy.get('button').should('contain.text', 'Create Portfolio').and('be.enabled')

        cy.get('.section-title').should('contain.text', 'My Model Portfolios')

        cy.get('[data-cy=quick-search-comparison-tab-search-input]').invoke('attr', 'placeholder').should('contain', 'Filter my models')
    })

    it(` Clicking on 'Create Portfolio' opens an empty portfolio modal`, () => {
        cy.get('.modal-content').should('not.exist')

        cy.get('button').contains('Create Portfolio').click()

        cy.get('.modal-content').should('exist')
    })
})
