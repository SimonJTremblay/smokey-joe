/// <reference types="Cypress" />

// les funds carry over et on checkbox apparait pour chaque, checked by default
// les actions buttons en haut change pour cancel et continue (n/4)
// on cancel, les boutons reviennent a ceux d'avant, et les checkbox disparaissent
// on continue, ca passe a la prochaine page (proposal content).. le nom de la comparaison carry et les funds
describe('From Comparison to Proposal page', function() {

    const   f1 = 'FID697',
            f2 = 'DJT04060',
            f3 = 'MAW104';
    
    this.beforeEach(() => {
        cy.login()
        cy.visit('/Comparison')
    })

    // TODO find a way to stub a comparison
    // TODO should we be able to add a portfolio to the proposal?

    it(`On new comparison, 'Create Proposal' button should be disabled`, () => {
        cy.get('.comparison-actions').find('.action').should('be.disabled')
    })

    it(`On addedd fund, 'Create Proposal' button should become clickable`, () => {
        cy.addFunds(f1,f2);

        cy.get('.comparison-actions').find('.action').should('not.be.disabled')
    })

    it(`On 'Create Proposal' Click, funds are carried over and a checked checkbox appears for each`, () => {
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

    it(`During proposal creation, adding a new comparison is unchecked by default`,  () => {
        cy.addFunds(f1,f2);

        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'

        cy.addFunds(f3, null);

        cy.wait(1000)

        cy.get('.comparison-card-header').find('.input-checkbox').each(($el, index, $list) => {
            
            if(index !== $list.length - 1){
                cy.wrap($el).should('have.class', 'selected')   //selected means  they are checked
            }
            else {  // last item of the array, therefore the one recently added 
                cy.wrap($el).should('not.have.class', 'selected')
            }
        })
    })

    it(`Checking a new Comparison adds it to the proposal page`,  () => {
        cy.addFunds(f1)

        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'

        cy.get('.action').find('span').should('have.text', 'Continue 1/4')

        cy.addFunds(f3, null);

        cy.wait(1000)

        cy.get('.comparison-card-header').find('.checkbox').eq(1).click()   // include last fund in proposal, increasing proposal total (x+1)/4

        cy.get('.action').find('span').should('have.text', 'Continue 2/4')
    })

    it(`On 'Continue' click, url should change to 'proposal'`,  () => {
        cy.addFunds(f1,f2)

        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'

        cy.get('button.action').click()     // Click on Continue

        // url should change to comparison tab
        cy.url().should('eq', Cypress.env('proposal'))

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

