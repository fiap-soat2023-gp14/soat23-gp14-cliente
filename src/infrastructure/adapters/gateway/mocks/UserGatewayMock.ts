import User from "src/core/domain/entities/User";
import UserFilter from "src/core/domain/entities/UserFilter";
import { IUserGateway } from "../../../../core/application/repositories/IUserGateway";
import { CPF } from "../../../../core/domain/valueObjects/Cpf";

export default class UserGatewayMock implements IUserGateway {
  constructor() { }


  public async create(user: User): Promise<User> {
    return Promise.resolve({ ...user, id: '3255ca79-f972-452b-8a90-9690f510b3fb' });
  }

  public async getAll(params: UserFilter): Promise<User[]> {
    const date = new Date();
    const users = [
      {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulano@email.com",
        "cpf": await CPF.create("45828179802"),
        "phone": "11987896525",
        "createdAt": date,
        "updatedAt": date
      }
    ].filter((user) => { user.cpf.value === params.cpf });

    return Promise.resolve(users);
  }

  public async getById(id: string): Promise<User> {
    return Promise.resolve(null);
  }

  public async update(id: string, user: User): Promise<User> {
    return Promise.resolve(user);
  }
}