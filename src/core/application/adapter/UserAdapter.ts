import { UserResponseDTO } from '../dto/UserResponseDTO';
import User from 'src/core/domain/entities/User';
import { CPF } from 'src/core/domain/valueObjects/Cpf';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { UserUpdateDTO } from '../dto/UserUpdateDTO';

export class UserAdapter {
  public async toDomain(user: UserCreationDTO): Promise<User> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: await CPF.create(user.cpf),
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    };
  }

  public toResponse(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf.value,
      phone: user.phone,
    };
  }

  public toResponseList(users: User[]): UserResponseDTO[] {
    return users.map((user) => this.toResponse(user));
  }

  public toUpdateDTO(user: UserUpdateDTO): UserUpdateDTO {
    return {
      name: user.name,
      phone: user.phone,
      email: user.email,
      updatedAt: new Date(),
    };
  }
}
