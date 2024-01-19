import { IConnection } from '../adapters/external/IConnection';
import UserGateway from '../adapters/gateway/UserGateway';
import UserUseCase from '../../core/application/usecase/UserUseCase';
import { UserAdapter } from '../../core/application/adapter/UserAdapter';
import { UserFilterDTO } from '../../core/application/dto/UserFilterDTO';
import { UserCreationDTO } from '../../core/application/dto/UserCreationDTO';
import { Inject, Injectable } from '@nestjs/common';
import User from 'src/core/domain/entities/User';


export class UserController {
  constructor(@Inject(UserUseCase) private userCase: UserUseCase) { }

  public async getAllUsers(params: UserFilterDTO) {
    const allUsers = await this.userCase.getAllUsers(params);

    const adapted = UserAdapter.toResponseList(allUsers);
    return adapted;
  }

  public async createUser(body: UserCreationDTO) {
    const userBody = await UserAdapter.toDomain(body);
    const user = await this.userCase.createUser(userBody);

    const adapted = UserAdapter.toResponse(user);
    return adapted;
  }

  // static async getUserById(id: string, dbconnection: IConnection) {
  //   const userGateway = new UserGateway(dbconnection);
  //   const user = await UserUseCase.getUserById(id, userGateway);

  //   const adapted = UserAdapter.toResponse(user);
  //   return adapted;
  // }

  // static async updateUser(
  //   id: string,
  //   body: UserCreationDTO,
  //   dbconnection: IConnection,
  // ) {
  //   const userGateway = new UserGateway(dbconnection);
  //   const userBody = await UserAdapter.toDomain(body);
  //   const user = await UserUseCase.updateUser(id, userBody, userGateway);

  //   const adapted = UserAdapter.toResponse(user);
  //   return adapted;
  // }
}
