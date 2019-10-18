// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', () => {

        const name = "connect-development.sid";
        const value = "s%3AtS3qQy9fKSmUihExVq_xa1RChdoxVXD2.IuLg2Mwfld1HVzDuW1JDdKkyTkSmtcDOp4DORTUlVkI";
        const options = {
            domain: "localhost",
            expiry: Date.parse("2020-10-18T18:38:51.784Z"),
            httpOnly: true,
            path: "/",
        }
    // cy.setCookie('name','connect-development.sid');
    // cy.setCookie('value','s%3AtS3qQy9fKSmUihExVq_xa1RChdoxVXD2.IuLg2Mwfld1HVzDuW1JDdKkyTkSmtcDOp4DORTUlVkI');
    // cy.setCookie('path', '/');
    // cy.setCookie('domain', 'localhost');
    // cy.setCookie('expiry', 'Sun, 18 Oct 2020 18:38:51 GMT');
    // cy.setCookie('httpOnly', true);
    cy.setCookie(name,value,options);

    //cy.getCookie('connect-development.sid');


    // cy.request({
    //     method: 'POST',
    //     url: 'http://localhost:5000/auth/login',
    //     form: true,
    //     body:{
    //         email:'sjomp103@gmail.com',
    //         password:'newPassword1',
    //     }
    // })

    // cy.getCookie('connect-development.sid');
})

Cypress.Commands.add('getUsers', () => {
    cy.fixture('incorrectUser.json').as('incorrectUser')
    cy.fixture('correctUser.json').as('correctUser')
})

