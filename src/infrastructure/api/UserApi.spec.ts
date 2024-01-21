import { Test, TestingModule } from '@nestjs/testing';
import UserApi from './UserApi';
import { UserController } from '../controller/UserController';
import { HttpStatus } from '@nestjs/common';

describe('UserApi', () => {
  let userApi: UserApi;
  let userControllerMock: UserController;
  let mockResponse: any;

  beforeEach(async () => {
    userControllerMock = {
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn()
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserApi],
      providers: [
        { provide: UserController, useValue: userControllerMock }
      ],
    }).compile();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    userApi = module.get<UserApi>(UserApi);
  });

  it('should be defined', () => {
    expect(userApi).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userController.createUser with userCreationDto', async () => {
      const userCreationDto = {
        id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
        name: "Fulano Beltrano",
        email: "fula",
        cpf: "59370565078",
        phone: "11987896525",
        createdAt: new Date(),
        updatedAt: new Date()
      };

      userControllerMock.createUser = jest.fn().mockResolvedValue(userCreationDto);

      await userApi.createUser(mockResponse, userCreationDto);

      expect(userControllerMock.createUser).toBeCalledWith(userCreationDto);
      expect(mockResponse.status).toBeCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toBeCalledWith(userCreationDto);
    });
  });

  describe('getAllUsers', () => {
    it('should call userController.getAllUsers with empty param', async () => {
      const userFilterDTO = { cpf: '' };

      userControllerMock.getAllUsers = jest.fn().mockResolvedValue([]);

      await userApi.getAllUsers(userFilterDTO);

      expect(userControllerMock.getAllUsers).toBeCalledWith(userFilterDTO);
    });
  });

  describe('getUserById', () => {
    it('should call userController.getUserById with id', async () => {
      const id = '3255ca79-f972-452b-8a90-9690f510b3fb';

      userControllerMock.getUserById = jest.fn().mockResolvedValue({});

      await userApi.getUserById(id);

      expect(userControllerMock.getUserById).toBeCalledWith(id);
    });
  });

  describe('updateUser', () => {
    it('should call userController.updateUser with id and userDto', async () => {
      const id = '3255ca79-f972-452b-8a90-9690f510b3fb';
      const userDto = {
        id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
        name: "Fulano Beltrano",
        email: "fula",
        cpf: "59370565078",
        phone: "11987896525",
        createdAt: new Date(),
        updatedAt: new Date()
      };

      userControllerMock.updateUser = jest.fn().mockResolvedValue({});

      await userApi.updateUser(mockResponse, id, userDto);

      expect(userControllerMock.updateUser).toBeCalledWith(id, userDto);
      expect(mockResponse.status).toBeCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toBeCalledWith();
    });
  });
});