// import { Given, When, Then, Before } from '@cucumber/cucumber';
// import { IUserGateway } from '../../../src/core/application/repositories/IUserGateway';
// import UserUseCase from '../../../src/core/application/usecase/UserUseCase';
// import { mock, instance, when } from 'ts-mockito';
// import User from '../../../src/core/domain/entities/User';
// import { UserFilterDTO } from '../../../src/core/application/dto/UserFilterDTO';
// import { expect } from 'expect';
// import { HttpNotFoundException } from '../../../src/infrastructure/exceptions/HttpNotFoundException';
// import { ValidationException } from '../../../src/infrastructure/exceptions/ValidationException';
// import { ConflictException, INestApplication } from '@nestjs/common';
// import { CPF } from '../../../src/core/domain/valueObjects/Cpf';
// import { Test, TestingModule } from '@nestjs/testing';
// import { AppModule } from '../../../src/app.module';

// let userGateway: IUserGateway;
// let userUseCase: UserUseCase;
// let result: any;
// let error: any;
// let user: User;

// // const mockedCPF = mock(CPF.create);
// // when(mockedCPF.create('59370565078')).thenResolve(instance(mockedCPF));
// // when(mockedCPF.validate()).thenResolve();

// let app: INestApplication;

// Before(async () => {
//   const moduleFixture: TestingModule = await Test.createTestingModule({
//     imports: [AppModule],
//   }).compile();

//   app = moduleFixture.createNestApplication();

//   await app.init();

//   userGateway = mock<IUserGateway>();
//   userUseCase = new UserUseCase(instance(userGateway));
// });

// Given('I have user creation data', async function () {
//   user = {
//     id: 'dbad9ae5-92d0-493f-bbbb-10895f3c15e9',
//     name: 'Fulano Beltrano',
//     email: 'fulanob@gmail.com',
//     cpf: await CPF.create('59370565078'),
//     phone: '11987896525',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };
// });

// Given('no user exists with the same CPF', function () {
//   // ...
// });

// When('I try to create a new user', async function () {
//   try {
//     result = await userUseCase.createUser(user);
//   } catch (e) {
//     error = e;
//   }
// });

// Then('the user should be created successfully', function () {
//   expect(result).toBeDefined();
//   // Add more assertions as needed
// });

// Then('I should receive a conflict exception', function () {
//   expect(error).toBeInstanceOf(ConflictException);
// });

// // ... Implement other Given, When, Then steps similarly ...

