describe('Dog Care', () => {
  beforeEach(() => {
    cy.intercept('/api/login').as('login');
    cy.login('admin@admin.com', '12345678');
    cy.wait('@login');
  });

  it('Should open create dog care dialog', () => {
    cy.visit('/aplikacja/profil-psa/1');
    cy.get('[cy-data="dog-profile-create-dog-care"]').click();
    cy.get('[cy-data="create-dog-care-dialog"]').should('be.visible');
  });

  it('Should not let create care if form is empty', () => {
    cy.visit('/aplikacja/profil-psa/1');
    cy.get('[cy-data="dog-profile-create-dog-care"]').click();
    cy.get('[cy-data="submit-care-button"]').should('be.disabled');
  });

  it('Should create dog care', () => {
    cy.visit('/aplikacja/profil-psa/1');
    cy.get('[cy-data="dog-profile-create-dog-care"]').click();
    cy.contains('label', 'Spacer').click();
    cy.get('[cy-data="care-startdate-field"]').type('20.10.2023');
    cy.get('[cy-data="care-starttime-field"]').type('10:00');
    cy.get('[cy-data="care-endtime-field"]').type('12:00');
    cy.intercept('/api/makeProposal').as('createCare');
    cy.get('[cy-data="submit-care-button"]').click();
    cy.wait('@createCare').then(intercept => {
      expect(intercept.response?.statusCode, 'status code').equal(200);
    });
    cy.visit('/aplikacja/opieka');
    cy.get('[aria-controls="p-tabpanel-1"]').click();
    cy.intercept('/api/dogCares?care_state_id=2&user_id=2&is_owner=1').as(
      'getDogCares'
    );
    cy.wait('@getDogCares');
    cy.contains('Andrzej').should('be.visible');
    cy.contains('20.10.2023, 10:00 - 20.10.2023, 12:00').should('be.visible');
  });
});
