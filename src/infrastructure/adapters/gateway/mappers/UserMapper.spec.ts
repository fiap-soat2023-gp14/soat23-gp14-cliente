import UserMapper from "./UserMapper";
import User from "src/core/domain/entities/User";
import { CPF } from "src/core/domain/valueObjects/Cpf";
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "../entity/UserEntity";

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

jest.mock('src/core/domain/valueObjects/Cpf', () => ({
  CPF: {
    create: jest.fn()
  }
}));

describe('UserMapper', () => {
  let userMapper: UserMapper;
  let userEntity: UserEntity;
  let mockCPF: any;
  let mockUuid: any;

  beforeEach(() => {
    userMapper = new UserMapper();
    mockCPF = CPF.create as jest.Mock;
    mockUuid = uuidv4 as jest.Mock;

    userEntity = {
      id: 'dbad9ae5-92d0-493f-bbbb-10895f3c15e9',
      name: 'Fulano Beltrano',
      email: '',
      cpf: '59370565078',
      phone: '11987896525',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  describe('toDomain', () => {
    it('should map a UserEntity to a User', async () => {
      mockUuid.mockReturnValue(userEntity.id);
      mockCPF.mockResolvedValue({
        value: userEntity.cpf,
        isValid: true
      });

      const result = await userMapper.toDomain(userEntity);

      expect(result).toEqual({
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        cpf: {
          value: userEntity.cpf,
          isValid: true
        },
        phone: userEntity.phone,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt
      });
    });
  });

  describe('toEntity', () => {
    it('should map a User to a UserEntity', () => {
      mockUuid.mockReturnValue(userEntity.id);

      const user: User = {
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        cpf: mockCPF,
        phone: userEntity.phone,
        createdAt: userEntity.createdAt || new Date(),
        updatedAt: userEntity.updatedAt || new Date()
      };

      const result = userMapper.toEntity(user);

      expect(result).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf.value,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    });
  });

  describe('toDomainList', () => {
    it('should map a list of UserEntity to a list of User', async () => {
      mockUuid.mockReturnValue(userEntity.id);
      mockCPF.mockResolvedValue({
        value: userEntity.cpf,
        isValid: true
      });

      const result = await userMapper.toDomainList([userEntity]);

      expect(result).toEqual([{
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        cpf: {
          value: userEntity.cpf,
          isValid: true
        },
        phone: userEntity.phone,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt
      }]);
    });
  });
});