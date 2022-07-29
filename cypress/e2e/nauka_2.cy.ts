describe('Opis', () => {
  //przed wykonaniem każdego 'it' wykona to niżej
  beforeEach(() => {
    cy.visit('/')
  })

  it('sprawdzanie, gdzie jest focus po załadowaniu strony', () => {
    // sprawdza, czy element na którym powinien być focus ma klase "new-todo"
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('deklarowanie stałej i wpisywanie tekstu w GUI', () => {
    // deklarowanie stałej
    const typedText = 'Buy Milk'
    // bierze element z klasą '.new-todo' wpisuje tam tekst z const, a następnie upewnia się, czy taki tekst tam jest
    // dobrze jest się upewniać, czy wpisany przez nas tekst faktycznie jest wpisany
    // bo może się okazać, że element nie ma logiky to aktualizowania wartości
    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('accepts input', () => {
    const typedText = 'Buy Milk'

    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })
})
