import { Test, TestingModule } from '@nestjs/testing';
import UserUseCase from './UserUseCase';
import { IUserGateway } from '../repositories/IUserGateway';
import { CPF } from '../../domain/valueObjects/Cpf';
import User from 'src/core/domain/entities/User';

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;
  let userGatewayMock: IUserGateway;
  let user: User;

  beforeEach(async () => {
    userGatewayMock = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn()
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUseCase,
        { provide: 'IUserGateway', useValue: userGatewayMock }
      ],
    }).compile();

    user = {
      id: 'dbad9ae5-92d0-493f-bbbb-10895f3c15e9',
      name: 'Fulano Beltrano',
      email: 'fulanob@gmail.com',
      cpf: await CPF.create('59370565078'),
      phone: '11987896525',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userUseCase = module.get<UserUseCase>(UserUseCase);

  });

  it('should be defined', () => {
    expect(userUseCase).toBeDefined();
  });

  describe('createUser', () => {

    it('should call userGateway.create with user', async () => {

      user.cpf.validate = jest.fn().mockReturnValue(true);
      userGatewayMock.getAll = jest.fn().mockResolvedValue([]);

      await userUseCase.createUser(user);

      expect(user.cpf.validate).toHaveBeenCalled();
      expect(userGatewayMock.create).toBeCalledWith(user);
    });

    it('should throw an error if user already exists', async () => {
      user.cpf.validate = jest.fn().mockReturnValue(true);
      userGatewayMock.getAll = jest.fn().mockResolvedValue([user]);

      await expect(userUseCase.createUser(user)).rejects.toThrowError('User already exists');
    });
  });

  describe('getAllUsers', () => {
    it('should call userGateway.getAll with empty param', async () => {
      const filter = { cpf: '' };

      await userUseCase.getAllUsers(filter);

      expect(userGatewayMock.getAll).toHaveBeenCalledWith(filter);
    });
  });

  describe('getUserById', () => {
    it('should call userGateway.getById with id', async () => {
      const id = '3255ca79-f972-452b-8a90-9690f510b3fb';

      userGatewayMock.getById = jest.fn().mockResolvedValue(user);

      await userUseCase.getUserById(id);

      expect(userGatewayMock.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if user not found', async () => {
      const id = '3255ca79-f972-452b-8a90-9690f510b3fb';

      userGatewayMock.getById = jest.fn().mockResolvedValue(null);

      await expect(userUseCase.getUserById(id)).rejects.toThrowError('User with id 3255ca79-f972-452b-8a90-9690f510b3fb not found');
    });
  });

  describe('updateUser', () => {
    it('should call userGateway.update with id and user', async () => {
      const id = '3255ca79-f972-452b-8a90-9690f510b3fb';

      await userUseCase.updateUser(id, user);

      expect(userGatewayMock.update).toHaveBeenCalledWith(id, user);
    });
  });
});
