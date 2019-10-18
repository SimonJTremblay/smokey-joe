// In PowerShell
//cd  C:\Users\Simon JTremblay\Desktop\SmokeyJoe
//node_modules/.bin/cypress open

//Enables intellisense with Cypress
/// <reference types="Cypress" />

// const { fakeEmail, fakePassword } = {fakeEmail:"test@email.com",fakePassword:"Password"}
//   const { email, password } = {email:"sjomp103@gmail.com",password:"newPassword1"}

describe('/login', function(){
 
  this.beforeEach(() => {
    cy.visit('/#/login')
  })

  it('greets with Glad you\'re back', () => {
    cy.contains('h1', 'Glad you\'re back.')
  })

  it('Don\'t have an account yet?', () => {
    cy
      .contains('Don\'t have an account yet?')
      .should('have.attr', 'href', 'https://capintel.io/pricing')
  })

  it('Log in button disable when no email/password', () => {
    cy
      .contains('Log in')
      .should('have.attr', 'disabled')
  })

  it('Log in button disable when email, but no password', () => {
    cy.getUsers()
    cy.get('@incorrectUser')
      .then((incorrectUser) => {
        cy.get('input[name=email]')
        .type(incorrectUser.email)
        .should('have.value',incorrectUser.email)
        cy
          .contains('Log in')
          .should('have.attr', 'disabled')
    })
  })

  it('Error wrong email or password', () => {
    cy.getUsers()
    cy.get('@incorrectUser')
      .then((incorrectUser) => {
        cy.get('input[name=email]')
          .type(incorrectUser.email)
          .should('have.value',incorrectUser.email)
        cy.get('input[name=password]')
          .type(`${incorrectUser.password}{enter}`)
        cy.get('.Toastify__toast-container')
          .should('contain','Error')
          .should('contain','Wrong email or password.')
      })
  })

  it('Correct authentication', () => {

    cy.getUsers()
    cy.get('@correctUser')
      .then((correctUser) => {
        cy.get('input[name=email]')
          .type(correctUser.email)
          .should('have.value',correctUser.email)

        // {enter} causes the form to submit
        cy.get('input[name=password]')
          .type(`${correctUser.password}{enter}`)
        cy.url().should('not.contain', '/auth.login')   // SJT -- Not sure what should be the landing page 
    })
  })
  
})
