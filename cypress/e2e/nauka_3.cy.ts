describe('Nie weim po co ten opis', () => {
  // to jest tak naprawde jak describe i można tego używać zamiennie
  context('patrz opis niżej w "it(...)", które tłumaczą trochę co się dzieje wewnątrz', () => {

    beforeEach(() => {
      //przed wykonaniem każdego 'it' wykona to niżej
      cy.visit('/')
      // Większość stron robi jakieś requesty do back endu, w cypress jesteśmy w stanie zasymulować odpowiedzi
      // na takie requesty. Aby to zrobić musimy wpisać poniższą komendę, a następnie jakieś cy.route - patrz
      // przykłady niżej. Innymi słowy, route nasłuchuje requestów wykonanych przez stronę i symuluje odpowiedź
      // z serwera.
      //
      // PAMIęTAJ route jest depracticated i nalżey zamiast tego używać intercept.
      //
      // Jak korzystać z intercept spójrz w dokumentacje https://docs.cypress.io/api/commands/intercept#Syntax lub w google.
      // Tutaj korzystam z route bo tak było w ich tutorialu :P
      // Aby dowiedzieć się czym się różni intercept od request, patrz niżej (szukaj request)
      cy.server()
    })

    it('symulacja, gdy w GUI wpisujemy tekst w input i klikamy enter, który robi request', () => {
      const itemText = 'Buy eggs'
      // można też w inny sposób przekazywać elementy, patrz przykład niżej
      // patrz 'przekazywanie mockowych danych'
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false
      })
      // tutaj szukamy elementu z klasą .new-todo, następnie wpisujemy w nim teksty który znajduje się i stałej
      // klikamy enter i upewniamy się, że po kliknięciu enter pole do wpisywania się czyści, bo tak z reguły
      // się dzieje, czyli wpisujemy coś w jakieś pole, klikamy enter, z tą wartością coś się dzieje,
      // ale samo pole do wpisywania już się czyści
      // tutaj przydaje się właśnie cy.route, które na wie, że na wysłanie requestu z takimi parametrami
      // jak wyżej, ma dostarczyć odpowiednią odpowiedz
      cy.get('.new-todo')
        .type(itemText)
        .type('{enter}')
        .should('have.value', '')
      // w naszym przykładzie po wpisaniu czego w jakieś pole, tekst powinnien się wyświetlić pod spodem
      // jako element listy
      // wyjaśnienie 'contain' szukaj niżej
      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    })

    it('wywoływanie specjalnie błędu', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })
      // to jest podobne to co wyżej - w 'wywoływanie specjalnie błędu' -, ale testujemy czy strona zachowa się poprawnie, jak odpowiedz będzie z kodem 500
      cy.get('.new-todo')
        .type('test{enter}')

      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })


    it('przekazywanie mockowych danych', () => {
      // wyjaśnienie 'fixture:todos'
      // w trzecim przekazanym elemencie do funkcji zaznaczamy, że ma szukać w folderze fixture, tam będzie szukał - dla naszego przypadku -
      // todos.json Nazwa const wewnątrz jsona chyba musi być taka sama jak nazwa pliku
      // w tamtym folderze może znajdować się coś takiego
      // const todos = [
      //     {
      //         'id':1
      //     }, {
      //         'id':2
      //     }
      // ]
      // const wyżej możemy też zdefiniować po prostu przed describe
      cy.route('GET', '/api/todos', 'fixture:todos')
      // to jest podobne to co wyżej  - w 'wywoływanie specjalnie błędu' - , ale testujemy czy strona zachowa się poprawnie, jak odpowiedz będzie z kodem 500
      cy.get('.new-todo')
        .type('test{enter}')

      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })


    it('tworzenie własnej funkcji', () => {
      // w ten sposób mówimy, aby szukał w ścieżce support/commands.ts odpowiedniej funkcji.
      // Jak tworzyć własne komendy, patrz w support/commands.ts

      cy.seedAndVisit('seedData');
      cy.get('.todo-list li')
        .should('have.length', 4)

    });

    //ten test jat dla przypadku niżej, poniższy kod html jest wywoływany w pętli
    // tyle razy ile elementów będzie się znajdowało w odpowiedzi na request
    //
    //  <li className={props.isComplete ? "completed" : null}>
    //     <div className="view">
    //       <input className="toggle" type="checkbox"
    //         checked={props.isComplete}/>
    //       <label>
    //         {props.name}
    //       </label>
    //       <button className="destroy"
    //         onClick={() => props.handleDelete(props.id)}/>
    //     </div>
    //   </li>
    it('praca z lista', () => {
      // w ten sposób szuka wszystkich elementów <li> z klasą "todo-list"
      cy.get('.todo-list li')
        // wśród tych elementów, wyszukuje te które mają klase "completed"
        .filter('.completed')
        // wiemy, że dla naszych mockowych danych taki element będzie tylko jeden, więc się upewniamy
        .should('have.length', 1)
        // wiemy, że wybrany element powinien mieć zawierać słowo 'Eggs' (w ten sposób sprawdzamy
        // teskt wyświetlany już w GUI)
        .and('contain', 'Eggs')
        .find('.toggle')
        .should('be.checked')
    });


    it('odwoływanie sie do czegoś', () => {
      cy.get('.todo-list li')
        .as('list')
      // to symuluje kliknięcie 'x' (czyli skasuj), który pojawia się dopiero jak najedziemy na dany
      // element z listy w GUI
      cy.get('@list')
        .first()
        .find('.destry')
        .invoke('show')
        .click()
      // upewniamy się, czy 'skasuj' działa poprawnie - nowa lista zawiera tylko trzy elementy, bez tego
      // który skasowaliśmy
      cy.get('@list')
        .should('have.length', 3)
        .and('not.contain', 'Milk')

    });

    // jeżeli chcemy, aby wykonał się tylko ten test, to możemy dodać .only
    it.only('Inny przykład jak pracować z danymi mock', () => {
      // ficture pobiera jsona z folderu fixtures o nazwie todos.json
      cy.fixture('todos')
        .then(todos => {
          // cypress pozwala nam na prace z biblioteką underscore.
          // co robi dokładnie head patrz w https://underscorejs.org/
          const target = Cypress._.head(todos)
          cy.route(
            'PUT',
            `/api/todos/${target.id}`,
            Cypress._.merge(target, {isComplete: true})
          )
        })

      cy.get('.todo-list li')
        .first()
        .as('first-todo')

      cy.get('@first-todo')
        .find('.toggle')
        .click()
        .should('be.checked')

      cy.get('@first-todo')
        .should('have.class', 'completed')

      cy.get('.todo-count')
        .should('contain', 2)
    })

    // wyobraźmy sobie, że mam trzy przyciski, które mają za zadanie filtrować nam elementy z list
    // np. z listy zadań które nam jeszcze zostały do zrobienia, taka to-do list

    // Przycisz Active pokaże nam tylko zadania, które jeszcze musimy zrobić
    // Completed pokaże tylko zadania, kótre są już zrobione
    // All pokaże nam wszystkie zadania
    it('filtry', () => {
      const filters = [
        {link: 'Active', expectedLength: 3},
        {link: 'Completed', expectedLength: 1},
        {link: 'All', expectedLength: 4}
      ]
      // wrap pozwala nam pracować na obiektach przekazanych jak parametr
      cy.wrap(filters)
        .each(filter => {
          // .contains, różni się tym od should('contain'...), że should('contain'...) upewnia się, że coś tylko zawiera
          // ,a .contains sprawdza, czy Dany element zawiera coś co mu damy jako parametr i pozwala jeszcze na nim pracować
          cy.contains(filter)
          cy.contains(filter.link)
            .click()

          // tutaj sprawdzamy, czy po kliknięciu w jakiś przycisk lista faktycznie się zmienia
          cy.get('.todo-list li')
            .should('have.length', filter.expectedLength)
        })

    });


    // Jeżeli chcemy wykonać jakieś requesty zanim wejdziemy na konkretny URL, musimy skorzystać z 'request'
    it('request', () => {
      // w tym przykładzie zanim wejdziemy na strone, wysyłamy reqest do pobrania listy zadań do zrobienia
      // w naszym przykłądzie będzie to zrobione lokalnie, bo wcześniej dodaliśmy w Angularze odpowiednią
      // bibliotekę, która obsługuje requesty lokalnie gdy jest włączony tryb debug
      // Jakbyśmy tego nie zrobili, to byśmy dostali error, bo 'request' wysłałby request na adres
      // http://localhost:8888/api/todos', a tam by nie było niczego, co by to obsłużyło
      beforeEach(() => {
          cy.request('GET', '/api/todos')
            // bierzemy body odpowiedzi
            .its('body')
            // i na każdym z elementów wysyłąmy kolejny request do ksaowania
            .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
        }

        // po wykonaniu tego co wyżej, dopiero wykonany kod poniżej
        // w skutek czego, w naszym GUI nie powinna się wyświetlić żadne zadanie

        // context('', () => {
        //     cy.visit('/')
        // })

      )
    });

  });
})
