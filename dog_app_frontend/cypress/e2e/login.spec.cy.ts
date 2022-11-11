describe('Login', () => {
  it('Should not login if the form is invalid', () => {
    cy.visit('/logowanie');
    cy.get('[formControlName="email"]').type('admin@admin.com');
    cy.get('[data-cy="login-submit-button"]').should('have.class', 'disabled');
  });

  it('Should not login if the credentials are invalid', () => {
    cy.login('admin@admin.com', 'wrong-password');
    cy.contains('Niepoprawne dane logowania');
    cy.url().should('not.include', 'aplikacja');
  });

  it('Should login if the credentials are correct', () => {
    cy.login('admin@admin.com', '12345678');
    cy.url().should('include', 'aplikacja');
  });
});
