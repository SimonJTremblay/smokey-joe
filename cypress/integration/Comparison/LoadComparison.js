/// <reference types="Cypress" />


describe('Able to load a comparison from Templates and Contact tabs', function() {
    const comparisonToGet = 'test_2_comparison_cards'
    const comparisonFromContact = 'john_test_contact_comparison'
    const firstName = 'John', lastName = 'Test'

    this.beforeEach(() => {
        cy.login()
    })

    it('load comparison from templates tab', () => {
        cy.visit('/templates/comparisons')

        cy.get('.rt-tbody').find('.rt-tr-group').eq(0).should('contain', comparisonToGet).find('.action-link').click()

        cy.url().should('eq', Cypress.env('comparison'))

        cy.get('.displayed-text').should('contain', comparisonToGet)
        //cy.get('.rt-tbody').find('.rt-tr-group').eq(0).contains('Load Template')
    })

    it('load comparison from contacts tab', () => {
        cy.visit('/contacts')

        // select John Test as contact
        //TODO find a way to select by name and not by index
        cy.get('.rt-tbody').find('.rt-tr-group').eq(1).should('contain', firstName).and('contain',lastName).click()

        // get to the comparisons tab
        cy.get('.segmented-control').find('li').contains('Comparisons').click()

        cy.get('.comparisons-list')
        .find('.comparison-list-item').eq(0)
        .should(($item) => {
            expect($item.find('.comparison-name')).to.contain(comparisonFromContact)
        })
        .then(() => {
            cy.get('.action-link').eq(1).should('contain', 'View').click()
        })

        cy.url().should('eq', Cypress.env('comparison'))

        cy.get('.displayed-text').should('contain', comparisonFromContact)
    })
})