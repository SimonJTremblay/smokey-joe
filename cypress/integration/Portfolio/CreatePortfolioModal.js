/// <reference types="Cypress" />

const   f1 = 'RBF137',
        f2 = 'MAW150',
        modelName = 'create-portfolio-model'

describe('create portfolio modal', function() {

    this.beforeEach(() => {
        cy.login()
        cy.visit('/templates/portfolios')
        cy.get('button').contains('Create Portfolio').click()
        
    })
    
    it(` Empty portfolio modal contains 'Empty Portfolio' title, enabled 'cancel' button and disabled 'save as..' button`, () => {

        cy.get('.modal-content').find('.edit-portfolio-symbols').should('contain', 'Empty Portfolio')
        
        // there should be two buttons present
        cy.get('.edit-portfolio-actions').find('button').its('length').should('eq', 2)

        // Cancel should be enabled
        cy.get('.edit-portfolio-actions').find('button').eq(0).should('contain.html', '<span>Cancel</span>').and('be.enabled')

        // 'Save as..' should be disabled
        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').and('be.disabled')
    })

    it(` Adding (1) fund to new empty portfolio, Weight and Dollars fields should be empty`, () => {
        cy.addFunds(f1)
        
        // make sure the correct fund identifier was selected
        cy.get('.portfolio-holdings').find('.portfolio-holding').should('contain', f1)
        cy.get('.portfolio-symbols').should('contain', f1)

        // weight and dollars fields should be empty
        cy.get('.portfolio-holding-field').find('.unit-input').eq(0).should('contain.value', '')
        cy.get('.portfolio-holding-dollars').find('input').should('contain.value', '')
    })

    it(` Removing (1) fund in new portfolio containing (1) fund. No funds class should appear in DOM when no holdings are selected`, () => {
        // no funds class should exist in the DOM
        cy.get('.edit-portfolio-no-funds').should('exist')

        cy.addFunds(f1)

        // no funds class should NOT exist in the DOM
        cy.get('.edit-portfolio-no-funds').should('not.exist')

        cy.get('.portfolio-holdings').find('.portfolio-remove-holding').click()

        // no funds class should be back in the DOM
        cy.get('.edit-portfolio-no-funds').should('exist')
    })
    
    //it(` Changing size value of new portfolio`, () => {
    //})

    it(` 'Save as..' button only becomes enabled after I enter a size value, at least (1) fund and cumulated weight equals 100%`, () => {
        cy.addFunds(f1)

        // 'Save as..' should be disabled
        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').and('be.disabled')

        // Allocating 50% weight
        cy.get('.portfolio-holding-field').find('.unit-input').eq(0).find('input').focus().type(50)

        // 'Save as..' should be disabled
        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').and('be.disabled')

        // Allocating 100% weight
        cy.get('.portfolio-holding-field').find('.unit-input').eq(0).find('input').focus().type(100)

        // 'Save as..' should be ENABLED
        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').and('be.enabled')

        // removing size value
        cy.get('.edit-portfolio-header').find('.bottom-row').find('input').focus().type('-').blur()

        // 'Save as..' should be disabled
        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').and('be.disabled')
    })

    it(` 'Save as..' button brings dropdown menu of 'Save for contact' and 'Save as model'`, () => {
        cy.addFunds(f1)

        // allocate remaining button
        cy.get('.allocate-remaining').find('.action-link').click()

        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').click()

        cy.get('[data-cy=dropdown-menu-options]').eq(0).should('contain', 'Save for Contact...')
        cy.get('[data-cy=dropdown-menu-options]').eq(1).should('contain', 'Save as Model')        
    })

    it(` 'Save for contact' button brings another modal`, () => {
        cy.addFunds(f1)

        // allocate remaining button
        cy.get('.allocate-remaining').find('.action-link').click()

        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').click()

        cy.get('[data-cy=dropdown-menu-options]').eq(0).click()

        cy.get('.modal-content h1').should('contain.html', '<span>Select a contact</span>')
    })

    it(` 'Save as model' button brings should pop a toast saying it needs a title'`, () => {
        cy.addFunds(f1)

        // allocate remaining button
        cy.get('.allocate-remaining').find('.action-link').click()

        cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').click()

        cy.get('[data-cy=dropdown-menu-options]').eq(1).click()

        cy.get('.Toastify').find('h5').should('contain', 'Error')
        cy.get('.Toastify').find('p').should('contain', 'Portfolio needs a title')
    })

    it(` Enter a unique title for the portfolio and Save as Model`, () => {        
        cy.createNewPortfolio(modelName)

        // Toast should show success
        cy.get('.Toastify').find('h5').should('contain', 'Success')
        cy.get('.Toastify').find('p').should('contain', 'Your portfolio has been saved!')

        // remove the newly created portfolio
        cy.get('.portfolio-card').each(($el, index, $list) => {
            const portfolioTitle = $el.find('.portfolio-name').text()

            if(portfolioTitle === modelName){
                cy.get('.icon-trash').click()
            }
        })
    })

    it(` Enter a duplicate title for a new portfolio; should get toast error message`, () => {  
        // add a new model\
        cy.createNewPortfolio(modelName)

        cy.get('button').contains('Create Portfolio').click()

        cy.createNewPortfolio(modelName)

        // Toast should show success
        cy.get('.Toastify').find('h5').should('contain', 'Error')
        cy.get('.Toastify').find('p').should('contain', 'You already have a model portfolio with this name. You must use a unique name.')
    })

    it(` Clicking on 'allocate remaining' should bring total weight at 100%` , () => {
        // add two funds to new portfolio
        cy.addFunds(f1, f2)

        // allocate remaining
        cy.get('.allocate-remaining').find('.action-link').click()

        cy.get('input[name="portfolio-size"]').invoke('val').then((value) => {
            const sizeValue = parseInt(value)       // current size of portfolio
            
            cy.get('.portfolio-holdings').find('.input-container').each(($el, index, $list) => {
                // 1st and 3rd are weight
                if([0,2].includes(index)){
                    cy.wrap($el).find('input').should('contain.value', 50)
                }

                // 2nd and 4th are Dollars
                if( [1,3].includes(index)){
                    cy.wrap($el).find('input').should('contain.value', sizeValue / 2)
                }
            })
        })
    })

    it(` Cancel button should close the modal` , () => {
        cy.get('.modal-content').should('exist')

        cy.addFunds(f1)

        cy.get('.edit-portfolio-actions').find('button').eq(0).should('contain.text', 'Cancel').click()
        
        cy.get('.modal-content').should('not.exist')        
    })
})  // Describe

Cypress.Commands.add('addFunds', (f1, f2) => {
    cy.get('.modal-content').find('.search-input').find('input')
    .focus()
    .type(f1)

    cy.get('.quicksearch-results').find('li').eq(0).click() 

    if(f2){
        cy.get('.modal-content').find('.search-input').find('input')
            .focus()
            .type(f2)

        cy.get('.quicksearch-results').find('li').eq(0).click() 
    }
})

Cypress.Commands.add('createNewPortfolio', (model) => {
    cy.addFunds(f1)

    //Edit portfolio title
    cy.get('.edit-portfolio-name').find('input').focus().type(model)

    cy.get('.allocate-remaining').find('.action-link').click()

    cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').click()

    cy.get('[data-cy=dropdown-menu-options]').eq(1).click()
})
