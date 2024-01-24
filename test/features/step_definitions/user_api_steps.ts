import { Given, When, Then, Before } from 'cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import ApplicationModule from '../../../src/core/application/application.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import expect from 'expect';

interface Response {
  statusCode: number;
  body: any;
}

let app: INestApplication;


Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ApplicationModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  await app.init();
});

Given('I have user creation data', function (this: any) {
  this.userCreationData = {
    id: "46942f69-608a-41b1-a4eb-4a281e619431",
    name: "Fulano Beltrano",
    email: "fulab@gmail.com",
    cpf: "61155457064",
    phone: "11987896525",
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

When('I send a POST request to {string} with the user creation data', async function (path) {
  this.response = await request(app.getHttpServer()).post(path).send(this.userCreationData) as Response;
  console.log(this.response.body);
  console.log(this.response.statusCode)
});

Then('I should receive a response with status code {int}', function (statusCode) {
  expect(this.response.statusCode).toBe(statusCode);
});

// Then('I should receive the response containing the created user information', function () {
//   // expect(this.response.body).to.match(this.userCreationData);
// });


