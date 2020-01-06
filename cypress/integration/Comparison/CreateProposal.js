/// <reference types="Cypress" />

// if it was created for a contact, contact info should display "prepared for..."
// Verify that all intended funds were carried over from comparison page
// Verify that comparison name was carried over from comparison page
// Not possible to change comparison name ??
// Should have two tabs: customize and options

describe('Create a Proposal on Proposal Page', function() {

    const   f1 = 'FID697',
            f2 = 'DJT04060',
            f3 = 'MAW104';
    
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

    it(`'Download' button should be visible and clickable in the top right of the page`, () => {
        // Create the proposal
        cy.addFunds(f1,f2,f3)
        cy.get('.comparison-actions').find('.action').click()       // Click on 'Create a proposal'
        cy.get('button.action').click()     // Click on Continue

        cy.get('.download-button').should('be.enabled')

        // TODO assert a modal is brought foreground after clicking the download button
    })

    it.only(`if it was created for a contact, contact info should display "prepared for..."`, ()=> {

    })

    it.only(`Comparison name should have gotten carried over from comparison page and is unchangeable from this page`, ()=> {

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