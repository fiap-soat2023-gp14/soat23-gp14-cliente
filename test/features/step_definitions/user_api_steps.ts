import { Given, When, Then, Before, After } from 'cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import expect from 'expect';
import { AppModule } from '../../../src/app.module';
import UserGatewayMock from '../../../src/infrastructure/adapters/gateway/mocks/UserGatewayMock';


interface Response {
  statusCode: number;
  body: any;
}

let app: INestApplication;

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider('IUserGateway')
    .useClass(UserGatewayMock)
    .compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, validationError: { target: false } }));

  await app.init();
});

After(async () => {
  await app.close();
});

//Scenario: Create a new user successfully
Given('I have user creation data', function (this: any) {

  this.userCreationData = {
    id: "3255ca79-f972-452b-8a90-9690f510b3fb",
    name: "Fulano Beltrano",
    email: "fulab@gmail.com",
    cpf: "99810807058",
    phone: "11987896525"
  };

});

When('I send a POST request to {string} with the user creation data', async function (path) {
  this.response = await request(app.getHttpServer()).post(path).send(this.userCreationData) as Response;
});

Then('I should receive a response with status code {int}', function (statusCode) {
  expect(this.response.statusCode).toBe(statusCode);
});

Then('I should receive the response containing the created user information', function () {
  expect(this.response.body.id).toBeDefined();
  expect(this.response.body.name).toEqual(this.userCreationData.name);
  expect(this.response.body.email).toEqual(this.userCreationData.email);
  expect(this.response.body.phone).toEqual(this.userCreationData.phone);
  expect(this.response.body.cpf).toEqual(this.userCreationData.cpf);
});

//Scenario: Not allow to create a user that already exists
Given('I have an user creation data with already registered CPF', function (this: any) {
  this.userCreationData = {
    id: "3255ca79-f972-452b-8a90-9690f510b3fb",
    name: "Fulano Beltrano",
    email: "fulab@gmail.com",
    cpf: "45828179802",
    phone: "11987896525"
  };
});

When('I send a POST request to {string} with the user creation data with already registered CPF', async function (path) {
  this.response = await request(app.getHttpServer()).post(path).send(this.userCreationData) as Response;
});

Then('I should receive a response with status code {int} and message {string}', function (statusCode, message) {
  expect(this.response.statusCode).toBe(statusCode);
  expect(this.response.body.message).toBe(message);
});

//Scenario: List all users
Given('I dont have any filter param', function (this: any) {
  this.filter = {};
});

When('I send a GET request to {string} without filter param', async function (path) {
  this.response = await request(app.getHttpServer()).get(path).query({ params: this.filter }) as Response;
});

Then('I should receive a list off all users', function () {
  expect(this.response.body.length).toBe(2);
});

// Scenario: List users with when pass CPF as param
Given('I have a CPF param', function (this: any) {
  this.cpf = '13495507019';
});

When('I send a GET request to {string} with a CPF filter', async function (path) {
  this.response = await request(app.getHttpServer()).get(path).query({ cpf: this.cpf }) as Response;
});

Then('I should receive the respective filtered user', function () {
  expect(this.response.body.length).toBe(1);
});

// Scenario: Get user by existent identifier
Given('I have an ID to search an User', function (this: any) {
  this.identifier = '3255ca79-f972-452b-8a90-9690f510b3fb';
});

When('I sent a GET request to {string} with an existent identifier', async function (path) {
  this.response = await request(app.getHttpServer()).get(path + '/' + this.identifier) as Response;
});

Then('I should receive the respective user', function () {
  expect(this.response.body.id).toBe(this.identifier);
});

// Scenario: Get user by non-existent identifier
Given('I have a non-existent ID to search an User', function (this: any) {
  this.identifier = '3255ca79-f972-452b-8a90-9690f510b3gc';
});

When('I sent a GET request to {string} with a non-existent identifier', async function (path) {
  this.response = await request(app.getHttpServer()).get(path + '/' + this.identifier) as Response;
});

Then('I should receive an null response', function (statusCode, message) {
  expect(this.response.statusCode).toBe(statusCode);
  expect(this.response.body.message).toBe(message);
});

//Scenario: Update successfully an User
Given('I have an existent User and I want to alter some data', function (this: any) {
  this.identifier = '3255ca79-f972-452b-8a90-9690f510b3fb';
  this.userUpdateData = {
    name: "Fulano Beltrano",
    email: "fulanoalter@gmail.com",
    cpf: "45828179802",
    phone: "11987896525"
  };
});

When('I sent a PUT request to {string} with an existent identifier and the data to update', async function (path) {
  this.response = await request(app.getHttpServer()).put(path + '/' + this.identifier).send(this.userUpdateData) as Response;
});

Then('I should receive a response with status code {int} for successfully update', function (statusCode) {
  expect(this.response.statusCode).toBe(statusCode);
});