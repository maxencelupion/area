describe('Slider Home Page', () => {
  it('successfully loads the home page', () => {
    cy.visit('/');
  });

  it('loads the services in the slider', () => {
    cy.visit('/');

    cy.get('.swiper-slide').should('have.length.greaterThan', 0);
  });

});

describe('API Requests on Slider Home Page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', '**/services').as('getServices');
    cy.intercept('GET', '**/actions').as('getActions');
    cy.intercept('GET', '**/reactions').as('getReactions');
  });

  it('makes successful requests for services, actions, and reactions', () => {
    cy.wait('@getServices').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.wait('@getActions').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.wait('@getReactions').its('response.statusCode').should('be.oneOf', [200, 304]);

  });

});
