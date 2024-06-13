class TimeTrackingModal {
    constructor() {
        this.submitButton = 'button[type="submit"]';
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueDetailModal = '[data-testid="modal:issue-details"]';
        this.titleInput = 'input[name="title"]';
        this.issueType = '[data-testid="select:type"]';
        this.descriptionField = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.backlogList = '[data-testid="board-list:backlog"]';
        this.issuesList = '[data-testid="list-issue"]';
        this.confirmationPopup = '[data-testid="modal:confirm"]';
        this.closeDetailModalButton = '[data-testid="icon:close"]';
        this.inputNumber = 'input[placeholder="Number"]';
        this.noTime = 'No time logged';
        this.icon = '[data-testid="icon:task"]';
        this.stopWatch = '[data-testid="icon:stopwatch"]';
        this.trackingModal = '[data-testid="modal:tracking"]';
        this.estimateTime = 'estimated';
        this.timeSpent = 'Time spent (hours)';
        this.timeRemaining = 'Time remaining (hours)';
        this.doneButton = 'Done';
    }
  
    getIssueModal() {
      return cy.get(this.issueModal);
    }
  
    getIssueDetailModal() {
      return cy.get(this.issueDetailModal);
    }
  
    editTitle(title) {
      cy.get(this.titleInput).wait(1000).type(title);
    }
  
    editDescription(description) {
      cy.get(this.descriptionField).type(description);
    }
    
    createIssue(issueDetails) {
      this.getIssueModal().within(() => {
        this.editTitle(issueDetails.title);
        this.editDescription(issueDetails.description);
        cy.get(this.submitButton).click();
      });
    }
    
    ensureIssueIsCreated(expectedAmountIssues, issueDetails) {
        cy.get(this.issueModal).should('not.exist');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');

        cy.get(this.backlogList).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.issuesList)
                .should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(issueDetails.title);
        });
    }
    
    addNewTime(estimation, title) {
      cy.get(this.backlogList)
        .contains(title)
        .within(() => {
          cy.get(this.icon).should('be.visible').click({ force: true });
        });
      cy.get(this.issueDetailModal).within(() => {
        cy.contains(this.noTime).should('exist');
        cy.get(this.inputNumber).type(estimation).wait(1000);
        cy.get(this.closeDetailModalButton).click();
      });
    }
    
    validateEstimateTimeIsNotVisible() {
      cy.get(this.estimateTime).should('not.exist');
    }

    ensureNewTimeWasAdded(estimation, title) {
      cy.reload();
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.get(this.inputNumber).should('have.value', estimation);
      });
    }
    
    editTime(estimation2, title) {
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.get(this.inputNumber).clear().type(estimation2).wait(1000);
        cy.get(this.closeDetailModalButton).click();
      });
    }
    
    ensureEditedTimeWasAdded(estimation2, title) {
      cy.reload();
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.get(this.inputNumber).should('have.value', estimation2);
      });
    }
    
    deleteTimeEstimation(title) {
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.get(this.inputNumber).clear().wait(1000);
        cy.get(this.closeDetailModalButton).click();
      });
    }
    
    ensureTimeWasRemoved(title) {
      cy.reload();
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.contains(this.noTime).should('exist');
      });
    }

    openFirstIssue() {
      cy.get(this.backlogList).children().first().click();
    }
    
    logTimeModal(spentTime, remainingTime) {
      cy.get(this.issueDetailModal).should('be.visible').within(() => {
        cy.contains(this.noTime).should('exist');
        cy.get(this.stopWatch).should('be.visible').click();
      });
    
      cy.get(this.trackingModal).should('be.visible');
      
      cy.get(this.trackingModal).within(() => {
        cy.contains(this.timeSpent).should('be.visible');
        cy.get(this.inputNumber).first().clear().type(spentTime).wait(1000);
        cy.contains(this.timeRemaining).should('be.visible');
        cy.get(this.inputNumber).last().clear().type(remainingTime).wait(1000);
        cy.contains(this.doneButton).should('be.visible').click();
      });
    
      cy.get(this.issueDetailModal).within(() => {
        cy.contains(this.noTime).should('not.exist');
        cy.get(this.closeDetailModalButton).should('be.visible').click();
      });
    }
    
    ensureTimeWasLogged(spentTime, remainingTime, title) {
      cy.reload();
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.contains(`${spentTime}h logged`).should('be.visible');
        cy.contains(`${remainingTime}h remaining`).should('be.visible');
      });
    }
    
    removeLoggedTime() {
      cy.get(this.issueDetailModal).within(() => {
        cy.get(this.stopWatch).click();
      });
      cy.get(this.trackingModal).within(() => {
        cy.contains(this.timeSpent);
        cy.get(this.inputNumber).first().clear().wait(1000);
        cy.contains(this.timeRemaining);
        cy.get(this.inputNumber).last().clear().wait(1000);
        cy.contains(this.doneButton).click();
      });
      cy.get(this.issueDetailModal).within(() => {
        cy.get(this.closeDetailModalButton).click();
      });
    }
    
    ensureLoggedTimeRemoved(title) {
      cy.reload();
      cy.get(this.backlogList).contains(title).click({ force: true });
      cy.get(this.issueDetailModal).within(() => {
        cy.contains(this.noTime).should("exist");
        cy.get(this.closeDetailModalButton).click();
      });
    }
  }
  export default new TimeTrackingModal();