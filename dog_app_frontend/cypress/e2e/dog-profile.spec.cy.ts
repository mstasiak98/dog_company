describe('Dog profile', () => {
  beforeEach(() => {
    cy.intercept('/api/login').as('login');
    cy.login('admin@admin.com', '12345678');
    cy.wait('@login');
  });

  it('Should not display dog profile edit form for other users than owner', () => {
    cy.visit('/aplikacja/edytuj-profil-psa/1');
    cy.intercept('/api/dogs/edit?dogProfileId=1').as('getEditForm');
    cy.wait('@getEditForm');
    cy.url().should('includes', 'brak-autoryzacji');
  });

  it('Should display add dog profile form', () => {
    cy.visit('/aplikacja/moje-psy');
    cy.get('[cy-data="create-dog-profile-button"]').click();
    cy.url().should('includes', 'dodaj-profil-psa');
  });

  it('Should not create dog profile if form is invalid', () => {
    cy.visit('/aplikacja/dodaj-profil-psa');
    cy.get('[cy-data="dog-profile-name-field"]').type('Atos');
    cy.get('[cy-data="dog-profile-submit-button"]').should('be.disabled');
  });

  it('Should create dog profile if form is valid', () => {
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
  });
});

describe('Dog profile details', () => {
  it('Should display dog profile details', () => {
    cy.visit('/aplikacja/poszukuja-opieki');
    cy.get('[cy-data="dog-profile-card"]').first().click();
    cy.get('[cy-data="dog-profile-details-container"]').should('be.visible');
    cy.url().should('includes', 'profil-psa');
  });
});
