# MeowYorkTimes

This project was developed with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Rrerequisites

1. NodeJs version 16 or above
2. [Fake auth Server](https://github.com/techiediaries/fake-api-jwt-json-server)

## Run MeowYorkTimes

1. Clone the fake auth server: `git clone https://github.com/techiediaries/fake-api-jwt-json-server.git`.
2. Navigate to auth server directory and run `npm install`.
3. Run the auth server: `npm run start-auth`.
4. Clone the angular project into another directory: `git clone https://github.com/MhmdKorhani/MeowYorkTimes.git`.
5. Navigate to angular project directory and run `npm install` to install required npm packages.
6. Run `ng serve --open` to run the dev server and make angular cli open your default browser and navigate to `http://localhost:4200/`.

## 3rd Party Libraries

**CSS Frameworks and Libraries**

1. [Bootstrap](https://getbootstrap.com) @5.3.0
2. [Angular Material](https://material.angular.io) @16.1.5
3. [Moment.js](https://momentjs.com/) @2.29.4

## 3rd Party APIs

1. [DummyJSON](https://dummyjson.com) - Comments API *This was used because New York Time's Comments API is deprecated.*
2. [UI Avatars](https://ui-avatars.com) - Initials Avatar Generator API
3. [Image CDN](https://random.imagecdn.app) - Random Pictures API

## ESlint

Run Angular ESlint tests `ng lint` or `npm run lint`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.