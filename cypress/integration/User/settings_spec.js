/// <reference types="Cypress" />

describe('/settings',function() {
   this.beforeEach(() => {
        // .. must login first 
        cy.login()

        cy.visit('/comparison')
            
    });

    it('Start by navigating to the Settings page', () => {

        cy.get('[data-cy=user-avatar]').click()

        cy.get('[data-cy=nav-to-settings]').click()

    })
})
