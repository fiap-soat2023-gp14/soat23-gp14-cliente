import { UserFilterDTO } from '../dto/UserFilterDTO';
import User from '../../domain/entities/User';
import { ConflictException, Inject } from '@nestjs/common';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';
import { IUserGateway } from '../repositories/IUserGateway';

export default class UserUseCase {

  constructor(@Inject('IUserGateway') private userGateway: IUserGateway) { }

  public async createUser(user: User) {
    await user.cpf.validate();
    const params: UserFilterDTO = new UserFilterDTO();
    params.cpf = user.cpf.value;
    const userExist = await this.getAllUsers(params);
    if (userExist.length > 0) {
      throw new ConflictException('User already exists');
    }

    return await this.userGateway.create(user);
  }

  public async getAllUsers(params: UserFilterDTO) {
    return await this.userGateway.getAll(params);
  }

  public async getUserById(id: string) {
    const userResponse = await this.userGateway.getById(id);
    if (!userResponse)
      throw new HttpNotFoundException(`User with id ${id} not found`);
    return userResponse;
  }

  public async updateUser(
    id: string,
    user: User
  ) {
    return this.userGateway.update(id, user);
  }
}
