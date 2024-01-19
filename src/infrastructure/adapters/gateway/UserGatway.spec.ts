import { Test, TestingModule } from "@nestjs/testing";
import UserGateway from "./UserGateway";
import UserMapper from "./mappers/UserMapper";
import { UserEntity } from "./entity/UserEntity";
import User from "src/core/domain/entities/User";

describe("UserGateway", () => {
  let userGateway: UserGateway;
  let dbConnection: any;
  let userResponse: User;
  let user: UserEntity;

  const COLLECTION_NAME = 'Users';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGateway, {
        provide: 'IConnection',
        useValue: {
          getCollection: jest.fn(),
        },
      }],
    }).compile();

    userGateway = module.get<UserGateway>(UserGateway);
    dbConnection = module.get('IConnection');

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

    jest.spyOn(UserMapper, 'toDomain').mockResolvedValue(userResponse);

  });

  describe('getById', () => {

    it('should return null if user not found', async () => {
      const id = 'mlsd222-222-222-222-3333';
      const findOneMock = jest.fn().mockResolvedValue(null);

      const getCollectionMock = jest.fn().mockReturnValue({
        findOne: findOneMock,
      });

      jest.spyOn(dbConnection, 'getCollection').mockReturnValue({
        getCollectionMock,
      });

      // const result = await userGateway.getById(id);

      // expect(dbConnection.getCollection).toHaveBeenCalledWith(COLLECTION_NAME);
      // expect(findOneMock).toHaveBeenCalledWith({ _id: id });
      // expect(result).toBeNull();
    });
  });
});