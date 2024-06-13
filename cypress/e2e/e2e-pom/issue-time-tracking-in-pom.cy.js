import TimeTrackingModal from '../../pages/TimeTrackingModal';

const issueDetails = {
  title: 'This is time tracking test',
  description: 'This is the description',
};

describe('Time Tracking', () => {
  const estimation = '10';
  const estimationUpdated = '20';
  const expectedIssues = '5';
  const spentTime = '2';
  const remainingTime = '5';

  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
        TimeTrackingModal.createIssue(issueDetails);
        TimeTrackingModal.ensureIssueIsCreated(expectedIssues, issueDetails);
      });
  });

  it('Should add an estimation to time tracking, update it and then remove it', () => {
    TimeTrackingModal.addNewTime(estimation, issueDetails.title);
    TimeTrackingModal.ensureNewTimeWasAdded(estimation, issueDetails.title);
    TimeTrackingModal.editTime(estimationUpdated, issueDetails.title);
    TimeTrackingModal.ensureEditedTimeWasAdded(estimationUpdated, issueDetails.title);
    TimeTrackingModal.deleteTimeEstimation(issueDetails.title);
    TimeTrackingModal.ensureTimeWasRemoved(issueDetails.title);
  });

  it('Should log time and remove the logged time', () => {
    TimeTrackingModal.openFirstIssue();
    TimeTrackingModal.logTimeModal(spentTime, remainingTime);
    TimeTrackingModal.ensureTimeWasLogged(
      spentTime,
      remainingTime,
      issueDetails.title
    );
    TimeTrackingModal.removeLoggedTime();
    TimeTrackingModal.ensureLoggedTimeRemoved(issueDetails.title);
  });
});