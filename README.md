# MeowYorkTimes

This project was developed with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Rrerequisites

1. NodeJs version 16 or above
2. [Fake auth Server](https://github.com/techiediaries/fake-api-jwt-json-server)

## Run MeowYorkTimes

1. Clone the fake auth server: `git clone https://github.com/techiediaries/fake-api-jwt-json-server.git`.
2. Navigate to auth server directory and run `npm install`.
3. Run `npm audit fix` to fix node dependencies.
4. Run the auth server: `npm run start-auth`.
5. Clone the angular project into another directory: `git clone https://github.com/MhmdKorhani/MeowYorkTimes.git`.
6. Navigate to angular project directory and run `npm install` to install required npm packages.
7. Run `ng serve --open` to run the dev server and make angular cli open your default browser and navigate to `http://localhost:4200/`.

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

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

1. A summary of code coverage will appear on your terminal.
2. navigate to `coverage/meow-york-times/` directory and open index.html file to see detailed code coverage tests.

*_Components and Services Covered In Tests:_*

1. App Component
2. Sign In Component
3. Sign Up Component
4. Landing Component
5. Stories Component
6. Auth Service
7. API Service
8. Common Service
9. Date Service
10. API Interceptor