

// - Si il y a un point dans l'onglet (dirty state), il devrait y avoir un modal qui apparait pour confirmer le delete (discard changes)
// . 	On cancel, ferme le modal et le comparison est toujours ouvert
// .	On delete, ferme le modal et le comparion disparait

// - quand je ferme la derniere comparaison, ca me remet a un blank comparison

// Le maximum de tabs devrait etre 6
// le plus est encore la meme si jen ai 6 ?
// moyen de naviguer a travers les autres cacher?

// Changer le nom dans le textbox change le nom du tab aussi



describe('comparison page tabs behaviour', function() {
    this.beforeEach(() => {
        cy.login()
        cy.visit('/comparison')
    })

    it(' + sign exists', () => {
        cy.get('[data-cy=new-comparison-tab]')
            .should('exist')
    })

    it(' On \'+\' click, a new blank Comparison tab is created', () => {
        
        //It should start with only one blank comparison
        cy.get('[data-cy=tab-items]').its('length').should('eq', 1)

        cy.get('[data-cy=new-comparison-tab]')
            .click()
        
        // There should now be 2 blank comparisons
        cy.get('[data-cy=tab-items]').its('length').should('eq', 2)

    })

    it(' After \'+\' click, + sign is still existant at the end of the tab line', () => {
        cy.get('[data-cy=new-comparison-tab]')
            .click()
        cy.get('[data-cy=new-comparison-tab]')
            .should('exist')
    })


    // - On hover d'une comparaison apparait un 'x' pour pouvoir deleter
    // TODO Broken
    it('On hover, tab should display \'x\' to close', () => {
        cy.get('[data-cy=close-tab]')
            .should('be.hidden')
        cy.get('.tab-icon')
            .trigger('mouseover')    // hover() isn't implemented in cypress as of oct 2019

        cy.get('[data-cy=close-tab]')
                //.trigger('mouseover')
            .should('not.be.hidden')
    })

    // . lorsque click sur le 'x'
    //     .	l'onglet de la comparison se ferme et ouvre celui de droite
    //     .	le container doit passer a celui droite
    //     .	si ce sont les dernier a droite, passe a gauche
    it.only('When \'x\' is clicked, tab closes and focus is on the right', () => {
        //need to force state of at least two tabs open
        

    })
})