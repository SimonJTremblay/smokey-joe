/// <reference types="Cypress" />

// les funds carry over et on checkbox apparait pour chaque, checked by default
// les actions buttons en haut change pour cancel et continue (n/4)
// on cancel, les boutons reviennent a ceux d'avant, et les checkbox disparaissent
// on continue, ca passe a la prochaine page (proposal content).. le nom de la comparaison carry et les funds
describe('Create a Proposal from scratch', function() {

    const   f1 = 'FID697',
            f2 = 'DJT04060',
            f3 = 'MAW104';
    
    this.beforeEach(() => {
        cy.login()
        cy.visit('/Comparison')
    })

    // TODO find a way to stub a comparison

    it(`On new comparison, 'Create Proposal' button should be disabled`, () => {
        cy.get('.comparison-actions').find('.action').should('be.disabled')
    })

    it(`On addedd fund, 'Create Proposal' button should become clickable`, () => {
        cy.addFunds(f1,f2);

        cy.get('.comparison-actions').find('.action').should('not.be.disabled')
    })

    it(`On 'Create Proposal' click, funds are carried over and a checkbox appears for each`, () => {
        cy.addFunds(f1,f2);

        cy.get('.comparison-actions').find('.action').click()
        
        // same funds are there and they have checkboxes
        // TODO fin a better way to assess if it's checked or not
        cy.get('.comparison-card').each( ($el, index, $list) => {
            cy.wrap($el).find('.comparison-card-header').find('.icon-checkmark')    // look for checkmarks

            const name = $el.find('.comparison-card-symbols').text()

            // Asserting the same funds are present by the code.
            if(index === 0){
                expect(name).to.equal(f1)
            }
            if(index === 1){
                expect(name).to.equal(f2)
            }
        })
    })

    it.only(`During proposal creation, adding a new comparion is not included in proposal by default`,  () => {
        cy.addFunds(f1,f2);

        cy.get('.comparison-actions').find('.action').click()

        cy.addFunds(f3, null);
    })

    it(`On 'Continue' click...`,  () => {

    })
})  // Describe

Cypress.Commands.add('addFunds', (f1, f2) => {
    cy.get('[data-cy=quick-search-comparison-tab-search-input]')
    .click()
    .type(f1)

    cy.get('#downshift-1-item-0') // first entry in the dropdownlist
    .click()

    if(f2){
        cy.get('[data-cy=quick-search-comparison-tab-search-input]')
        .click()
        .type(f2)

        cy.get('#downshift-1-item-0') // first entry in the dropdownlist
        .click()
    }
})

