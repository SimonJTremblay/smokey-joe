// - Si il y a un point dans l'onglet (dirty state), il devrait y avoir un modal qui apparait pour confirmer le delete (discard changes)
// . 	On cancel, ferme le modal et le comparison est toujours ouvert
// .	On delete, ferme le modal et le comparion disparait

// - quand je ferme la derniere comparaison, ca me remet a un blank comparison

// Le maximum de tabs devrait etre 6
// le plus est encore la meme si jen ai 6 ?
// moyen de naviguer a travers les autres cacher?

// Changer le nom dans le textbox change le nom du tab aussi

/// <reference types="Cypress" />

const   comparisonToGet = 'test_2_comparison_cards',
        comparison2ToGet = 'test_2_close_comparion_tab',
        comp1 = 'testing_removing_tabs_1',
        comp2 = 'testing_removing_tabs_2',
        comp3 = 'testing_removing_tabs_3';

describe('comparison page tabs behaviour', function() {

    this.beforeEach(() => {
        cy.login()
        cy.visit('/comparison')
    })

    it(` + sign exists`, () => {
        cy.get('[data-cy=new-comparison-tab]')
            .should('exist')
    })

    it(` On '+' click, a new blank Comparison tab is created`, () => {
        
        //It should start with only one blank comparison
        cy.get('[data-cy=tab-items]').its('length').should('eq', 1)

        cy.get('[data-cy=new-comparison-tab]')
            .click()
        
        // There should now be 2 blank comparisons
        cy.get('[data-cy=tab-items]').its('length').should('eq', 2)

    })

    it(` After '+' click, '+' sign is still existant at the end of the tab line`, () => {
        cy.get('[data-cy=new-comparison-tab]')
            .click()
        cy.get('[data-cy=new-comparison-tab]')
            .should('exist')
    })

    // - On hover d'une comparaison apparait un 'x' pour pouvoir deleter
    // TODO I can't imitate mousehover and then click on the x
    it(` On hover, tab should display 'x' to close`, () => {
        //cy.get('.tab-icon')
            //.trigger('mouseover')    // hover() isn't implemented in cypress as of oct 2019

        cy.visit('/templates/comparisons')

        // take the first comparison from the list and click on loadComparison
        cy.get('.rt-tbody').find('.rt-tr-group').eq(0).find('.action-link').click()
        
        cy.get('[data-cy=close-tab]').should('be.hidden').invoke('show').should('not.be.hidden')
    })

    // . lorsque click sur le 'x'
    //     .	l'onglet de la comparison se ferme et ouvre celui de droite
    //     .	le container doit passer a celui droite
    //     .	si ce sont les dernier a droite, passe a gauche
    it.only(` When 'x' is clicked, tab closes and focus is on the right`, () => {
        //need to force state of at least two tabs open

        cy.visit('/templates/comparisons')
        cy.get('.rt-tbody').find('.rt-tr-group').eq(0).find('.action-link').click()

        cy.visit('/templates/comparisons')
        cy.get('.rt-tbody').find('.rt-tr-group').eq(1).find('.action-link').click()

        // There should now be more than 1 loaded comparisons
        cy.get('[data-cy=tab-items]').its('length').should('be.gt', 1)
    })
})

Cypress.Commands.add('removeComparisonCards', () => {
    // Get the tab list length
    cy.get('[data-cy=tab-items]').its('length')
        .then(length => {

            // iterate over the list and remove first item until list is empty... there should be only a new comparison left
            while(length){
                // Get the first tab and remove it from the list
                cy.get('[data-cy=close-tab]').eq(0).invoke('show').click()
                length--
            }
        })

})