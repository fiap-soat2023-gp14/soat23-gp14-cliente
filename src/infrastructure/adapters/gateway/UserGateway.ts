import { IUserGateway } from 'src/core/application/repositories/IUserGateway';
import User from 'src/core/domain/entities/User';
import UserFilter from 'src/core/domain/entities/UserFilter';
import { UserEntity } from './entity/UserEntity';
import UserMapper from './mappers/UserMapper';
import { IConnection } from '../external/IConnection';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class UserGateway implements IUserGateway {
  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>) { }


  public async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    try {
      await this.userRepository.save(userEntity);
      return UserMapper.toDomain(userEntity);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async getAll(params: UserFilter): Promise<User[]> {
    const filter = params ? params : {};
    const users: UserEntity[] = await this.userRepository.find(filter);

    return await UserMapper.toDomainList(users);
  }

  // public async getById(id: string): Promise<User> {
  //   const userResponse = await this.dbConnection
  //     .getCollection(this.COLLECTION_NAME)
  //     .findOne({ _id: id });

  //   if (!userResponse) return Promise.resolve(null);

  //   return await UserMapper.toDomain(userResponse);
  // }

  // public async update(id: string, user: User): Promise<User> {
  //   try {
  //     const userEntity = UserMapper.toEntity(user);
  //     delete userEntity.id;
  //     const updateUser = {
  //       $set: { ...userEntity },
  //     };
  //     await this.dbConnection
  //       .getCollection(this.COLLECTION_NAME)
  //       .updateOne({ _id: id }, updateUser);

  //     return UserMapper.toDomain(userEntity);
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     throw error;
  //   }
  // }
}
