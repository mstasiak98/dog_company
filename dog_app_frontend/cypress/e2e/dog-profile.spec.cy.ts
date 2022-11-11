describe('Dog profile', () => {
  beforeEach(() => {
    cy.intercept('/api/login').as('login');
    cy.login('admin@admin.com', '12345678');
    cy.wait('@login');
  });

  it('Should not create dog profile if form is invalid', () => {
    cy.visit('/aplikacja/dodaj-profil-psa');
    cy.get('[cy-data="dog-profile-name-field"]').type('Atos');
    cy.get('[cy-data="dog-profile-submit-button"]').should('be.disabled');
  });

  /*it('Should create dog profile if form is valid', () => {
    cy.visit('/aplikacja/dodaj-profil-psa');
    cy.get('[cy-data="dog-profile-name-field"]').type('Atos');
    cy.get('[cy-data="dog-profile-color-field"]').type('Czarny');
    cy.get('[cy-data="dog-profile-breed-field"]')
      .click()
      .contains('ul li > span', 'Bergamasco')
      .click();
    cy.get('[cy-data="dog-profile-size-field"]')
      .click()
      .contains('ul li > span', 'mały')
      .click();
    cy.get('[cy-data="dog-profile-feature-field"]')
      .click()
      .contains('ul li > span', 'Przyjazny psom')
      .click();
    cy.get('body').click(0, 0);
    cy.contains('label', 'Spacer').click();
    cy.contains('label', 'Weekend').click();
    cy.get('[cy-data="dog-profile-description-field"]').type(
      'Przykladowy opis'
    );
    cy.get('[cy-data="dog-profile-submit-button"]').click();
    cy.contains('Atos').should('be.visible');
  });*/
});
