describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('https://example.cypress.io');
    // mówimy, aby znalazł element z nazwą 'type', a następnie ma w niego kliknąć
    cy.contains('type').click();
    // upewniamy się, czy po wejściu w dany element, URL wygląda tak jakbyśmy się spodziewali, czyli zawiera
    // podany value
    cy.url().should('include', '/commands/actions');

    // w ten sposób znajdujemy element, z klasa .action-email i wpisujemy tam, poprzez '.type', podany tekst, następnie
    // upewniamy się czy wybrany element zawiera dokładnie taki tekst jaki chcieliśmy.
    // Z tego co czytam, nie zalecają wyszukiwania elementów za pomocą klas, ale czasami nie ma wyjścia
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');

  });
});
