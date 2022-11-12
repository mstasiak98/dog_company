describe('Messages', () => {
  beforeEach(() => {
    cy.intercept('/api/login').as('login');
    cy.login('admin@admin.com', '12345678');
    cy.wait('@login');
  });

  it('Should open create thread dialog', () => {
    cy.visit('/aplikacja/profil-psa/1');
    cy.get('[cy-data="dog-profile-send-message"]').click();
    cy.get('[cy-data="send-message-dialog"]').should('be.visible');
  });

  it('Should not create thread form is invalid', () => {
    cy.visit('/aplikacja/profil-psa/1');
    cy.get('[cy-data="dog-profile-send-message"]').click();
    cy.get('[cy-data="create-thread-button"]').should('have.class', 'disabled');
  });

  it('Should create thread message', () => {
    cy.visit('/aplikacja/profil-psa/1');
    cy.get('[cy-data="dog-profile-send-message"]').click();
    cy.intercept('/api/messages/store').as('createThread');
    cy.get('[cy-data="send-message-thread-field"]').type('Wątek testowy');
    cy.get('[cy-data="send-message-body-field"]').type(
      'Przykładowa treść wiadomości'
    );
    cy.get('[cy-data="create-thread-button"]').click();

    cy.wait('@createThread').then(intercept => {
      expect(intercept.request.body).to.deep.equal({
        subject: 'Wątek testowy',
        message: 'Przykładowa treść wiadomości',
        recipient: 1,
      });
      expect(intercept.response?.statusCode, 'status code').equal(200);
      expect(intercept.response?.body, 'response body').to.deep.equal({
        success: true,
      });
    });
  });
});
