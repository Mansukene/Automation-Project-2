describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const textArea = 'textarea[placeholder="Add a comment..."]';
    const issueComments = '[data-testid="issue-comment"]';

    it('Should create a Testing comment successfully', () => {
        const comment = 'Testing comment';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get(textArea).type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get(issueComments).should('contain', comment);
        });
    });

    it('Should edit a Testing comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'Updated comment';

        getIssueDetailsModal().within(() => {
            cy.get(issueComments)
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get(textArea)
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get(issueComments)
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete the updated comment successfully', () => {
        getIssueDetailsModal()
            .find(issueComments)
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find(issueComments)
            .should('not.exist');
    });
});

