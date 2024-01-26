import { Given, When, Then, Before, AfterAll } from 'cucumber';
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

Given('I have user creation data', function (this: any) {
  const date = new Date()

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