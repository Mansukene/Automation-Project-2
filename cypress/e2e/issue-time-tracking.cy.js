describe('Time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const estimationInputField = 'input[placeholder="Number"]'
    const estimationDisplay = '.sc-rBLzX.irwmBe'

    it('Should add, edit and remove estimation time in time tracking functionality', () => {
        const estimation = '5';

        getIssueDetailsModal().within(() => {
            cy.get(estimationInputField).clear().type(estimation).should('have.value', estimation);

            cy.get(estimationDisplay).should('contain', estimation);

            cy.get(estimationInputField).clear().type('7').should('have.value', '7');
            cy.get(estimationDisplay).should('contain', '7');

            cy.get(estimationInputField).clear().should('not.have.value')
            cy.get(estimationDisplay).should('not.have.value');
        });
    });
});