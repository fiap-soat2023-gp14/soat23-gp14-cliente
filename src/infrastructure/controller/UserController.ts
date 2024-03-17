import UserUseCase from '../../core/application/usecase/UserUseCase';
import { UserAdapter } from '../../core/application/adapter/UserAdapter';
import { UserFilterDTO } from '../../core/application/dto/UserFilterDTO';
import { UserCreationDTO } from '../../core/application/dto/UserCreationDTO';
import { Inject } from '@nestjs/common';


export class UserController {
  constructor(
    @Inject(UserUseCase) private userCase: UserUseCase,
    @Inject(UserAdapter) private userAdapter: UserAdapter
  ) { }

  public async getAllUsers(params: UserFilterDTO) {
    const allUsers = await this.userCase.getAllUsers(params);

    const adapted = this.userAdapter.toResponseList(allUsers);
    return adapted;
  }

  public async createUser(body: UserCreationDTO) {
    const userBody = await this.userAdapter.toDomain(body);
    const user = await this.userCase.createUser(userBody);

    const adapted = this.userAdapter.toResponse(user);
    return adapted;
  }

  public async getUserById(id: string) {
    const user = await this.userCase.getUserById(id);

    const adapted = this.userAdapter.toResponse(user);
    return adapted;
  }

  public async updateUser(
    id: string,
    body: UserCreationDTO,
  ) {
    const userBody = await this.userAdapter.toDomain(body);
    const user = await this.userCase.updateUser(id, userBody);

    const adapted = this.userAdapter.toResponse(user);
    return adapted;
  }

  public async removeUser(
      id: string) {
    const user = await this.userCase.getUserById(id);
    await this.userCase.anonymizeUserData(id, user);
  }

}
