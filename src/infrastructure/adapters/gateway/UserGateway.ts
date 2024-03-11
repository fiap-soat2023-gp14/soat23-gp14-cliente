import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import User from 'src/core/domain/entities/User';
import UserFilter from 'src/core/domain/entities/UserFilter';
import { UserEntity } from './entity/UserEntity';
import UserMapper from './mappers/UserMapper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class UserGateway implements IUserGateway {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(UserMapper) private userMapper: UserMapper
  ) { }


  public async create(user: User): Promise<User> {
    const userEntity = this.userMapper.toEntity(user);
    try {
      await this.userRepository.save(userEntity);
      return this.userMapper.toDomain(userEntity);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async getAll(params: UserFilter): Promise<User[]> {
    const filter = params ? params : {};
    const users: UserEntity[] = await this.userRepository.find({ where: filter });

    return await this.userMapper.toDomainList(users);
  }

  public async getById(id: string): Promise<User> {
    const userResponse = await this.userRepository.findOne({ where: { id } });

    if (!userResponse) return Promise.resolve(null);

    return await this.userMapper.toDomain(userResponse);
  }

  public async update(id: string, user: User): Promise<User> {
    try {
      user.id = id;
      const userEntity = this.userMapper.toEntity(user);
      await this.userRepository.update(id, userEntity);

      return this.userMapper.toDomain(userEntity);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
