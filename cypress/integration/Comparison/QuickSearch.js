/// <reference types="Cypress" />
// - Il y a un bouton 'All (fleche par en bas)'
// .	OnClick, un dropdown s'affiche pour delimiter la recherche a: [all, funds, portfolios, stocks]
// .	Si je choisi un different de celui en haut, le dropdown se ferme et le nom du bouton est changer
// .	Si c'est le meme, le dropdown se ferme et le nom ne change pas 

// - Quand je tape quelque chose de specifique, ca me donne uniquement ce produit (ou ceux qui matchent) 
// .	Tous les elements sont clickable
// .	Lorsque je clique, le dropdown se ferme

// - Si je tappe quelque chose qui n'existe pas, ca me donne aucun drop down
//     *** la seule indication que jai que je nai rien trouver est que le spinning a arrete et la loupe est revenu...p-e a ajouter ***

// - Sur click du bouton 'Advanced Search', un modal apparait pour la recherche avancee

describe('Comparison Tab quick search for funds/portfolios/stocks ', function() {
    const searchWord = 'ma', f1='MGS2322', f2 ='CIG90087', f3='ECF5035', f4 = 'MAW104';
    const funds = [f1,f2,f3];

    this.beforeEach(() => {
        cy.login()
        cy.visit('/comparison')
    })

    //      Je peux interagir avec le input du quickSearch
    //      Quand je tape une lettre, ca me met un dropdown avec une liste d'items
    //  	Je clique sur le premier de la liste
    //      il apparait comme comparison card 
    it('QuickSearch Tab is present and interactable', () => {
        cy.get('input')
        .click()
        .type(searchWord)
        .should('have.value', searchWord)

        cy.get('.quick-search-item').should('have.length.greaterThan', 0)   // should have at least one value
        cy.get('#downshift-2-item-0') // first entry in the dropdownlist
        .click()

        cy.get('.comparison-card')
        .should('exist')
    })

    
    it('Add 3 comparisons from quickSearch... should all be in comparion-card', () => {

        funds.forEach(element => {
            cy.get('#downshift-2-input')
            .click()
            .type(element)

            cy.get('#downshift-2-item-0') // first entry in the dropdownlist
            .click()
        });

        cy.get('.comparison-card')
        .should('have.length', 3)
    })

    it('Remove one comparison from comparison-card', () => {

        cy.get('#downshift-2-input')
        .click()
        .type(f4)

        cy.get('#downshift-2-item-0') // first entry in the dropdownlist
        .click()

        cy.get('.comparison-card')
        .should('have.length', 1)

        cy.get('.menu-button')
        .click()
        
        cy.get('.destructive')
        .click()

        cy.get('.comparison-card')
        .should('have.length', 0)
    })

    it('Clicking on advanced search opens a modal', () => {
        cy.get('.comparison-advanced-search')
        .click()

        cy.get('.advanced-search-modal')
        .should('exist')
    })
})