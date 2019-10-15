// In PowerShell
//cd  C:\Users\Simon JTremblay\Desktop\SmokeyJoe
//node_modules/.bin/cypress open

//Enables intellisense with Cypress
/// <reference types="Cypress" />

describe('/login', function(){
  const { fakeEmail, fakePassword } = {fakeEmail:"test@email.com",fakePassword:"Password"}
  const { email, password } = {email:"sjomp103@gmail.com",password:"newPassword1"}
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
    cy.get('input[name=email]')
      .type(fakeEmail)
      .should('have.value',fakeEmail)
    cy
      .contains('Log in')
      .should('have.attr', 'disabled')
  })

  it('Error wrong email or password', () => {
    cy.get('input[name=email]')
      .type(fakeEmail)
      .should('have.value',fakeEmail)
    cy.get('input[name=password]')
      .type(`${fakePassword}{enter}`)
    cy.get('.Toastify__toast-container')
      .should('contain','Error')
      .should('contain','Wrong email or password.')
  })

  it('Correct authentication', () => {
    cy.get('input[name=email]')
      .type(email)
      .should('have.value',email)

    // {enter} causes the form to submit
    cy.get('input[name=password]')
      .type(`${password}{enter}`)
    cy.url().should('not.contain', '/auth.login')   // SJT -- Not sure what should be the landing page 
  })
 })

// Stub Request
// static user
    // seed the DB ?
// dynamic user
  //db setup/teardown

