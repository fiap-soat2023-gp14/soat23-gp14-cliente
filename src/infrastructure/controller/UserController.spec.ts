import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './UserController';
import UserUseCase from 'src/core/application/usecase/UserUseCase';
import { UserAdapter } from 'src/core/application/adapter/UserAdapter';

describe('UserController', () => {
  let userController: UserController;
  let userUseCaseMock: UserUseCase;
  let userAdapterMock: UserAdapter;
  let adaptedUsers: any[];

  beforeEach(async () => {
    userUseCaseMock = {
      getAllUsers: jest.fn(),
      createUser: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn()
    } as any;

    userAdapterMock = {
      toResponseList: jest.fn(),
      toResponse: jest.fn(),
      toDomain: jest.fn()
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserUseCase, useValue: userUseCaseMock },
        { provide: UserAdapter, useValue: userAdapterMock }
      ],
    }).compile();

    userController = module.get<UserController>(UserController);

    adaptedUsers = [
      {
        id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
        name: "Fulano Beltrano",
        email: "beltrano@gmail.com",
        cpf: "59370565078",
        phone: "11987896525"
      },
      {
        id: "3255ca79-f972-452b-8a90-9690f510b3fb",
        name: "Fulano Ciclano",
        email: "fulano@email.com",
        cpf: "45828179802",
        phone: "11987896525"
      }
    ];

  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should call userUseCase.getAllUsers with empty param', async () => {
      const userFilterDTO = { cpf: '' };

      userAdapterMock.toResponseList = jest.fn().mockResolvedValue(adaptedUsers);
      userUseCaseMock.getAllUsers = jest.fn().mockResolvedValue(adaptedUsers);

      const result = await userController.getAllUsers(userFilterDTO);

      expect(result).toEqual(adaptedUsers);
      expect(userUseCaseMock.getAllUsers).toHaveBeenCalledWith(userFilterDTO);
    });

    it('should call userUseCase.getAllUsers with cpf param', async () => {
      const userFilterDTO = { cpf: '59370565078' };

      userAdapterMock.toResponseList = jest.fn().mockResolvedValue(adaptedUsers[0]);
      userUseCaseMock.getAllUsers = jest.fn().mockResolvedValue(adaptedUsers[0]);

      const result = await userController.getAllUsers(userFilterDTO);

      expect(result).toEqual(adaptedUsers[0]);
      expect(userUseCaseMock.getAllUsers).toHaveBeenCalledWith(userFilterDTO);
    });
  });

  describe('createUser', () => {
    it('should call userUseCase.createUser with user', async () => {
      const user = {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulano@email.com",
        "cpf": "45828179802",
        "phone": "11987896525",
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

      userAdapterMock.toDomain = jest.fn().mockResolvedValue(user);

      await userController.createUser(user);

      expect(userAdapterMock.toDomain).toHaveBeenCalledWith(user);
      expect(userUseCaseMock.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('getUserById', () => {
    it('should call userUseCase.getUserById with id', async () => {
      const id = "3255ca79-f972-452b-8a90-9690f510b3fb";

      userAdapterMock.toResponse = jest.fn().mockResolvedValue(adaptedUsers[1]);
      userUseCaseMock.getUserById = jest.fn().mockResolvedValue(adaptedUsers[1]);

      const result = await userController.getUserById(id);

      expect(result).toEqual(adaptedUsers[1]);
      expect(userUseCaseMock.getUserById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateUser', () => {
    it('should call userUseCase.updateUser with id and user', async () => {
      const userId = "3255ca79-f972-452b-8a90-9690f510b3fb";
      const user = {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulanoci@gmail.com",
        "cpf": "45828179802",
        "phone": "11987896525",
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

      const updatedUser = {
        id: "3255ca79-f972-452b-8a90-9690f510b3fb",
        name: "Fulano Ciclano",
        email: "fulanoci@gmail.com",
        cpf: "45828179802",
        phone: "11987896525",
      };

      userAdapterMock.toDomain = jest.fn().mockResolvedValue(user);
      userUseCaseMock.updateUser = jest.fn().mockResolvedValue(user);

      await userController.updateUser(userId, user);

      userAdapterMock.toResponse = jest.fn().mockResolvedValue(updatedUser);

      expect(userAdapterMock.toDomain).toHaveBeenCalledWith(user);
      expect(userUseCaseMock.updateUser).toHaveBeenCalledWith(userId, user);
    });
  });

  describe('removeUser', () => {
    it('should call userUseCase.anonymizeUserData with id and user', async () => {
      const userId = "3255ca79-f972-452b-8a90-9690f510b3fb";
      const user = {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulanoci@gmail.com",
        "cpf": "45828179802",
        "phone": "11987896525",
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

      const deletedUser = {
        id: "3255ca79-f972-452b-8a90-9690f510b3fb",
        name: "DADO REMOVIDO",
        email: "DADO REMOVIDO",
        cpf: "00000000000",
        phone: "DADO REMOVIDO",
      };

      userUseCaseMock.getUserById = jest.fn().mockResolvedValue(user);
      userUseCaseMock.anonymizeUserData = jest.fn().mockResolvedValue(deletedUser);

      await userController.removeUser(userId);

      expect(userUseCaseMock.getUserById).toHaveBeenCalledWith(userId);
      expect(userUseCaseMock.anonymizeUserData).toHaveBeenCalledWith(userId, user);
    });
  });
});