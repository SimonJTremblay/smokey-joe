/// <reference types="Cypress" />

describe('Create a Proposal on Proposal Page', function() {

    const   f1 = 'FID697', f1Name = 'Fidelity Technology Innovators Series F',
            f2 = 'DJT04060', f2Name = 'Desjardins Quebec Balanced R',
            f3 = 'MAW104', f3Name = 'Mawer Balanced Series A';

    const   comparisonToGet = 'test_2_comparison_cards',
            comparisonFromContact = 'john_test_contact_comparison';

    // select John Test as contact
    const firstName = 'John', lastName = 'Test'
    
    this.beforeEach(() => {
        cy.login()
        cy.visit('/Comparison')
    })

    // TODO find a way to stub a comparison

    it(`On landing page, top part should display user information and firm name`, () => {
        // Create the proposal
        cy.addFunds(f1,f2,f3)
        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue

        // Check for correct user information
        cy.getUsers()
        cy.get('@correctUser')
        .then((correctUser) => {
            cy.get('.advisor-name').should('contain.text', correctUser.firstName).and('contain.text', correctUser.lastName)
            cy.get('.company').should('contain.text', correctUser.firmName)
            cy.get('.advisor-email').should('contain.text', correctUser.email)
            cy.get('.advisor-phone').should('contain.text',correctUser.phoneNumber)
            cy.get('.address-1').should('contain.html','&nbsp') // if not provided in user profile
            cy.get('.address-2').should('contain.html','&nbsp')
            cy.get('.province').should('contain.text', correctUser.city).and('contain.text', correctUser.province)
            cy.get('.country').should('contain.text',correctUser.country)
        })
    })

    // TODO
    it(`'Download' button should be visible and clickable in the top right of the page`, () => {
        // Create the proposal
        cy.addFunds(f1,f2,f3)
        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue

        cy.get('.download-button').should('be.enabled').click()

        // TODO assert a modal is brought foreground after clicking the download button
    })

    //TODO check if the left tab section is changed upon click on either button
    // why is there a href?
    // should('have.attr', 'href', '/users')
    it(`Proposal should have two tabs: customize and options`, () => {
        // Create the proposal
        cy.addFunds(f1,f2,f3)
        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue

        cy.get('.proposal-tabs').find('li').its('length').should('eq', 2)
        cy.get('.proposal-tabs').find('li').should('contain.text', 'Customize').and('contain.text', 'Options')
    })

    it(`If it was created for a contact, contact info should display "prepared for [contact-name] on [comparison-date]"`, ()=> {
        cy.visit('/contacts')

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

        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue

        // Verify that the name in the "Prepared for... is the correct contact"
        cy.get('.proposal-contact').should('contain.text',firstName).and('contain.text',lastName)

    })

    it(`Comparison name was carried over from comparison page`, ()=> {
        cy.visit('/templates/comparisons')

        cy.get('.rt-tbody').find('.rt-tr-group').eq(0).should('contain', comparisonToGet).find('.action-link').click()

        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue

        cy.get('.comparison-name').should('contain', comparisonToGet)
    })

    it(`All selected funds were carried over from comparison page`, ()=> {
        cy.addFunds(f1)
        cy.addFunds(f2,f3)
        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue
        
        cy.get('.proposal-item-name').as('tableHeaders')
        // Verify if all funds are present
        cy.get('@tableHeaders').its('length').should('eq', 6)     // there are two tabels with same thead, hence 3*2 = 6

        //  Verify correct names for each indivudal funds
        cy.get('@tableHeaders').each( ($el, index, $list) => {
            if(index === 0 || index === 3){
                cy.wrap($el).should('contain.text', f1Name)
            }
            else if(index === 1 || index === 4){
                cy.wrap($el).should('contain.text', f2Name)
            }
            else {
                cy.wrap($el).should('contain.text', f3Name)
            }
        })
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