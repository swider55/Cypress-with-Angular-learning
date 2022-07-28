//Możemy za każdym razem wpisywać cały adres strony

// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

//LUB


describe('The Home Page', () => {
  it('successfully loads', () => {
    // dzieki temu, że zadeklarowałem baseUrl w cypress.config.ts nie musze ciągle wpisywać o adresu strony,
    // gdybym tego nie zrobił, musiałbym ciągle wpisywać 'baseUrl: 'http://localhost:4200','. Działa to takze
    // dla cy.request()
    cy.visit('/') // change URL to match your dev URL
  })
})
