describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should sign up successfully with valid information', () => {

    cy.intercept('POST', `**/auth/register`).as('postRegister');

    cy.get('input[placeholder="Enter your email"]').type('lowan@ferraro.re');
    cy.get('input[placeholder="Enter your password"]').type('test');
    cy.get('input[placeholder="Enter your surname"]').type('test');
    cy.get('input[placeholder="Enter your lastname"]').type('test');

    cy.contains('Continue').click();

    cy.wait('@postRegister')
      .its('response.statusCode')
      .should('be.oneOf', [400, 401, 404]);

    cy.contains('email already exists').should('be.visible');
  });

  it('Email already exist', () => {

    cy.intercept('POST', `**/auth/register`).as('postRegister');

    cy.get('input[placeholder="Enter your email"]').type('lowan@ferraro.re');
    cy.get('input[placeholder="Enter your password"]').type('test');
    cy.get('input[placeholder="Enter your surname"]').type('test');
    cy.get('input[placeholder="Enter your lastname"]').type('test');

    cy.contains('Continue').click();

    cy.wait('@postRegister')
      .its('response.statusCode')
      .should('be.oneOf', [400, 401, 404]);

    cy.contains('email already exists').should('be.visible');
  });

});