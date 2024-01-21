import { Test, TestingModule } from '@nestjs/testing';
import UserGateway from './UserGateway';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entity/UserEntity';
import UserMapper from './mappers/UserMapper';
import { CPF } from 'src/core/domain/valueObjects/Cpf';

describe('UserGateway', () => {
  let userGateway: UserGateway;
  let userRepositoryMock: Repository<UserEntity>;
  let userMapperMock: UserMapper;
  let userCPFValid: any;
  let adaptedUsers: any[];

  beforeEach(async () => {
    userRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    } as any;

    userMapperMock = {
      toDomain: jest.fn(),
      toDomainList: jest.fn(),
      toEntity: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGateway,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: UserMapper,
          useValue: userMapperMock,
        },
      ],
    }).compile();

    userGateway = module.get<UserGateway>(UserGateway);
    userRepositoryMock = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));



    jest.mock('src/core/domain/valueObjects/Cpf', () => {
      return {
        create: jest.fn().mockImplementation((value: string) => {
          return Promise.resolve({
            value,
            isValid: true,
          });
        }),
      };
    });

    userCPFValid = {
      "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
      "name": "Fulano Ciclano",
      "email": "fulano@email.com",
      "cpf": await CPF.create("45828179802"),
      "phone": "11987896525",
      "createdAt": new Date(),
      "updatedAt": new Date()
    };

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
    expect(userGateway).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const user = {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulano@email.com",
        "cpf": "45828179802",
        "phone": "11987896525",
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

      userMapperMock.toEntity = jest.fn().mockReturnValue(user);
      userRepositoryMock.save = jest.fn().mockReturnValue(user);

      await userGateway.create(userCPFValid);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
      expect(userMapperMock.toEntity).toHaveBeenCalledWith(userCPFValid);
      expect(userMapperMock.toDomain).toHaveBeenCalledWith(user);
    });

    it('should handle errors when user creation fails', async () => {

      const error = new Error('Error creating user');
      userRepositoryMock.save = jest.fn().mockRejectedValue(error);

      await expect(userGateway.create(userCPFValid)).rejects.toThrowError(error);
    });

  });

  describe('getAll', () => {
    it('should get all users successfully call with empty filter', async () => {
      const filter = { cpf: '' };

      userRepositoryMock.find = jest.fn().mockResolvedValue({ where: filter });
      userMapperMock.toDomainList = jest.fn().mockReturnValue(adaptedUsers);

      const result = await userGateway.getAll(filter);

      expect(userRepositoryMock.find).toHaveBeenCalledWith({ where: filter });
      expect(result).toEqual(adaptedUsers);
    });

    it('should get all users successfully call with filter', async () => {
      const filter = { cpf: '59370565078' };

      userRepositoryMock.find = jest.fn().mockResolvedValue({ where: filter });
      userMapperMock.toDomainList = jest.fn().mockReturnValue(adaptedUsers[0]);

      const result = await userGateway.getAll(filter);

      expect(userRepositoryMock.find).toHaveBeenCalledWith({ where: filter });
      expect(result).toEqual(adaptedUsers[0]);
    });
  });

  describe('getById', () => {
    it('should get user by id successfully', async () => {
      const userId = "3255ca79-f972-452b-8a90-9690f510b3fb";

      userRepositoryMock.findOne = jest.fn().mockResolvedValue({ where: { id: userId } });
      userMapperMock.toDomain = jest.fn().mockReturnValue(adaptedUsers[1]);

      await userGateway.getById(userId);

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });

    it('should handle errors when user not found', async () => {
      const userId = "3255ca79-f972-452b-8a90-9690f510b3fb";

      userRepositoryMock.findOne = jest.fn().mockResolvedValue(null);

      await expect(userGateway.getById(userId)).resolves.toBeNull();
    });
  });

  describe('update', () => {
    const user = {
      "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
      "name": "Fulano Ciclano",
      "email": "fulano@email.com",
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

    it('should update user successfully', async () => {
      userMapperMock.toEntity = jest.fn().mockReturnValue(updatedUser);
      userRepositoryMock.update = jest.fn().mockResolvedValue(updatedUser);

      await userGateway.update(user.id, userCPFValid);
      expect(userRepositoryMock.update).toHaveBeenCalledWith(user.id, updatedUser);
      expect(userMapperMock.toEntity).toHaveBeenCalledWith(userCPFValid);
      expect(userMapperMock.toDomain).toHaveBeenCalledWith(updatedUser);
    });

    it('should handle errors when user update fails', async () => {
      const error = new Error('Error updating user');
      userRepositoryMock.update = jest.fn().mockRejectedValue(error);

      await expect(userGateway.update(user.id, userCPFValid)).rejects.toThrowError(error);
    });
  });
});