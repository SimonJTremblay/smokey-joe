/// <reference types="Cypress" />


describe(`Able to load a comparison from Templates and Contact tabs`, function() {
    const comparisonToGet = 'test_2_comparison_cards'
    const comparisonFromContact = 'john_test_contact_comparison'
    // select John Test as contact
    const firstName = 'John', lastName = 'Test'

    this.beforeEach(() => {
        cy.login()
    })

    it(`load comparison from templates tab`, () => {
        cy.visit('/templates/comparisons')

        cy.get('.rt-tbody').find('.rt-tr-group').eq(0).should('contain', comparisonToGet).find('.action-link').click()

        cy.url().should('eq', Cypress.env('comparison'))

        cy.get('.displayed-text').should('contain', comparisonToGet)
        //cy.get('.rt-tbody').find('.rt-tr-group').eq(0).contains('Load Template')
    })

    it(`load comparison from contacts tab`, () => {
        cy.visit('/contacts')

        //TODO Change cypress selectors to more comprehensive attribute names

        //iterate over the array of contacts
        cy.get('.rt-tbody').find('.rt-tr-group').each(($el, index, $list) => {
            const fname = $el.find('[data-cy=fname-contact]').text()            
            const lname = $el.find('[data-cy=lname-contact]').text()
            
            // if fname and lname match, I've found my test contact
            if(fname.includes(firstName) && lname.includes(lastName)){
                $el.find('[data-cy=fname-contact]').click()
            }
        })

        // get to the comparisons tab on the contact modal
        cy.get('.segmented-control').find('li').contains('Comparisons').click()

        // This test contact should only contain one test comparison, therefore I select first index.
        cy.get('.comparisons-list')
        .find('.comparison-list-item').eq(0)
        .should(($item) => {
            expect($item.find('.comparison-name')).to.contain(comparisonFromContact)
        })
        .then(() => {
            cy.get('.action-link').eq(1).should('contain', 'View').click()  // If more buttons are added/deleted, change this index
        })

        // url should change to comparison tab
        cy.url().should('eq', Cypress.env('comparison'))

        // make sur current comparison name is the same as the one we loaded
        cy.get('.displayed-text').should('contain', comparisonFromContact)
    })
})