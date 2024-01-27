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
    let user;
    const users = [
      {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulano@email.com",
        "cpf": await CPF.create("45828179802"),
        "phone": "11987896525",
        "createdAt": date,
        "updatedAt": date
      },
      {
        "id": "3255ca79-f972-452b-8a90-9690f510b3fb",
        "name": "Fulano Ciclano",
        "email": "fulano@email.com",
        "cpf": await CPF.create("13495507019"),
        "phone": "11987896525",
        "createdAt": date,
        "updatedAt": date
      }
    ];
    user = users.find((user) => user.cpf.value === params.cpf);
    if (params && user) {
      user = [user]
    }
    if (params && !user) {
      user = []
    }

    if (Object.keys(params).length === 0) {
      return Promise.resolve(users);
    }
    return Promise.resolve(user);

  }

  public async getById(id: string): Promise<User> {
    const date = new Date();
    let user;
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
    ];

    user = users.find((user) => user.id === id);

    if (user) {
      return Promise.resolve(user);
    }
    return Promise.resolve(null);
  }

  public async update(id: string, user: User): Promise<User> {
    const userUpdate = {
      "id": id,
      ...user
    };
    return Promise.resolve(userUpdate);
  }
}