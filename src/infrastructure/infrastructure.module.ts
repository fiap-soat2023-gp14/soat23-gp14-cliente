import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import UserApi from './api/UserApi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './adapters/gateway/entity/UserEntity';
import { UserController } from './controller/UserController';
import UserGateway from './adapters/gateway/UserGateway';
import UserUseCase from 'src/core/application/usecase/UserUseCase';
import UserMapper from './adapters/gateway/mappers/UserMapper';
import { UserAdapter } from 'src/core/application/adapter/UserAdapter';

@Module({
  imports: [ApplicationModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserApi],
  providers: [
    { provide: 'IUserGateway', useClass: UserGateway },
    UserController,
    UserUseCase,
    UserMapper,
    UserAdapter],
})
export default class InfrastructureModule { }
