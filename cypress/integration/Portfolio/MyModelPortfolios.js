/// <reference types="Cypress" />

const   f1 = 'FID6283',
        f2 = 'CIG18183',
        f3 = 'MAW150',
        f4 = 'AIM32363',
        portfolioNameA = 'my-model-portfolio-test-A',
        portfolioNameB = 'my-model-portfolio-test-B';
        

describe('My Model Portfolios', function() {

    //Add (2) portfolios to the model page
    this.beforeAll(() => {
        cy.login()
        cy.visit('/templates/portfolios')
        cy.createNewPortfolio(portfolioNameA, f1, f2)
        cy.createNewPortfolio(portfolioNameB, f3, f4)

    })
    this.beforeEach(() => {
        cy.login()
        cy.visit('/templates/portfolios')
    })

    it(` A portfolio card contains 'edit'(pencil), 'delete'(trash) and 'Compare' buttons`, () => {
        cy.get('.portfolio-card').each(($el, index, $list) => {
            cy.wrap($el).find('.icon-pencil').should('exist')
            cy.wrap($el).find('.icon-trash').should('exist')
            
            cy.wrap($el).find('.card-actions').should('contain', 'Compare')
        })
    })

    it(` On 'edit' click, a modal appears with current portfolio `, () => {
        cy.get('.modal-content').should('not.exist')
        
        cy.get('.portfolio-card').eq(0).find('.icon-pencil').click()

        cy.wait(500)

        cy.get('.modal-content').should('exist')

        // title should be the current portfolio
        cy.get('.top-row').find('.editable-text').should('contain.html', `<span>${portfolioNameA}</span>`)

        // Click cancel to close the modal
        cy.get('.cancel').click()
    })

    it(` On 'delete' click, the portfolio immediately gets deleted `, () => {
        // get the number of portfolios-cards
        cy.get('.portfolio-card').its('length').then(($value) => {
            cy.get('.portfolio-card').eq(0).find('.icon-trash').click()

            cy.wait(100)
    
            // number of portfolios-cards should be -1
            cy.get('.portfolio-card').its('length').should('eq', $value - 1)            
        })

    })
})

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

Cypress.Commands.add('createNewPortfolio', (model, fund01, fund02) => {
    cy.get('button').contains('Create Portfolio').click()
    cy.addFunds(fund01, fund02)

    //Edit portfolio title
    cy.get('.edit-portfolio-name').find('input').focus().type(model)

    cy.get('.allocate-remaining').find('.action-link').click()

    cy.get('.edit-portfolio-actions').find('button').eq(1).should('contain.text', 'Save as..').click()

    cy.get('[data-cy=dropdown-menu-options]').eq(1).click()
})
