describe('Issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });

  it('Test case 1: Issue deletion', () => {
    cy.get('[data-testid="icon:trash"]').should('be.visible').click();
    cy.get('button').contains('Delete issue').should('be.visible').click();

    cy.get('[data-testid="modal-confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('not.exist');
    cy.contains('This is an issue of type: Task.').should('not.exist');
  });

  it('Test case 2: Cancel the issue deletion', () => {
    cy.get('[data-testid="icon:trash"]').should('be.visible').click();
    cy.get('button').contains('Cancel').should('be.visible').click();

    cy.get('[data-testid="modal-confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.contains('This is an issue of type: Task.').should('be.visible');
  });
});