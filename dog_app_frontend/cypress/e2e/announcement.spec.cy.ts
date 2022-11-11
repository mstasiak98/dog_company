describe('Announcement', () => {
  beforeEach(() => {
    cy.intercept('/api/login').as('login');
    cy.login('admin@admin.com', '12345678');
    cy.wait('@login');
  });

  it('Should not create announcement if form is invalid', () => {
    cy.visit('/aplikacja/ogloszenia/dodaj-ogloszenie');
    cy.get('[cy-data="create-announcement-title-field"]').type(
      'Poszukuję opieki dla 3 letniego owczarka'
    );
    cy.get('[cy-data="create-announcement-submit-button"]').should(
      'be.disabled'
    );
    /* cy.get('[cy-data="create-announcement-city-field"]').type('Kalisz');
    cy.contains('label', 'Spacer').click();
    cy.get('[cy-data="create-announcement-quantity-field"]').type('2');
    cy.get('[cy-data="create-announcement-description-field"]').type(
      'Przykładowy opis ogłoszenia'
    );*/
  });

  it('Should create announcement if form is valid', () => {
    cy.visit('/aplikacja/ogloszenia/dodaj-ogloszenie');
    cy.get('[cy-data="create-announcement-title-field"]').type(
      'Poszukuję opieki dla 3 letniego owczarka'
    );
    cy.get('[cy-data="create-announcement-city-field"]').type('Kalisz');
    cy.contains('label', 'Spacer').click();
    cy.get('[cy-data="create-announcement-quantity-field"]').type('2');
    cy.get('[cy-data="create-announcement-description-field"]').type(
      'Przykładowy opis ogłoszenia'
    );
    cy.get('[cy-data="create-announcement-start-field"]').type(
      '20.10.2023 15:00'
    );
    cy.get('body').click(0, 0);
    cy.get('[cy-data="create-announcement-end-field"]').type(
      '20.10.2023 16:00'
    );
    cy.get('[cy-data="create-announcement-submit-button"]').click();
    cy.contains('Poszukuję opieki dla 3 letniego owczarka').should(
      'be.visible'
    );
  });
});
