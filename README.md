# Część dotycząca tylko cypressa

## Kroki jakie trzeba zrobić na początku
 - upewnić się, że spełniamy wszytkie wymagania z https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements, oraz, czy 
   są zainstalowane wszytki dodatkowe paczki, np. dla Debiana, trzeba puścić dodatkową komendę
   `apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb`
 - Jeżeli wszystko jest przygotowane, to przechodzimy do ścieżki naszego projektu
       `cd /your/project/path`
 - Upewniamy się, czy mamy folder `node_modules`, jak nie to puścić komendę `npm i`
 - Puszczamy komendę `npm install cypress --save-dev`, flaga sprawi, że cypress doda nam się tylko w trybie dev
 - Aby odpalić GUI cypress, trzeba wpisać `npx cypress open`, npx jest domyślnie w npm
 - w ten sposób stworzy się folder cypress, z features i support
 - Gdy wszytko poprawnie przeklikamy w GUI cypressa, to stworzy nam się dodatkow folder e2e

## Więcej szczegółówna
 - https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn
 - https://docs.cypress.io/guides/getting-started/opening-the-app#Adding-npm-Scripts
 - https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
 

-------------------------------------------------------------------------------------------------------------------------------------------------------
# CypressWithAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
