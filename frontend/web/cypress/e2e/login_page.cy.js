describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', `**/auth/login`).as('postLogin');

    cy.get('input[type="text"]').type('lowan@ferraro.re');
    cy.get('input[type="password"]').type('root');

    cy.contains('Sign in').click();

    cy.wait('@postLogin').its('response.statusCode').should('eq', 200);

    cy.url().should('include', '/?access_token=');
  });

  it('should display an error with invalid credentials', () => {
    cy.intercept('POST', `**/auth/login`).as('postLogin');

    cy.get('input[type="text"]').type('invalidemail@example.com');
    cy.get('input[type="password"]').type('invalidpassword');

    cy.contains('Sign in').click();

    cy.wait('@postLogin')
      .its('response.statusCode')
      .should('be.oneOf', [400, 401, 404]);

    cy.contains('User not found').should('be.visible');
  });
});