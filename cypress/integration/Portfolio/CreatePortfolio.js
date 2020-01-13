/// <reference types="Cypress" />

describe('create portfolio', function() {

    this.beforeEach(() => {
        cy.login()
        cy.visit('/templates/portfolio')
    })

    it(` Templates/Portfolio contains Create Portfolio button, 'My Model Portfolios' title and a search bar`, () => {

    })

    it(` Clicking on 'Create Portfolio' opens an empty portfolio modal`, () => {
        
    })

    it(` Empty portfolio modal contains enabled 'cancel' button and disabled 'save as..' button`, () => {
        
    })

    it(` Changing size value`, () => {
        
    })

    it(` Adding funds to portfolio`, () => {
        
    })

    it(` Removing funds to portfolio`, () => {
        
    })

    it(` 'save as..' button only becomes enabled after I enter a Size value, at least one fund and cumulated weight equals 100%`, () => {
        
    })

    it(` Clicking on 'allocate remaining' should bring total weight at 100%` , () => {
        
    })

    it(` Cancel button action` , () => {
        
    })

    it(` Save as button action` , () => {
        
    })
})
