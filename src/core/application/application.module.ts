import { Module } from '@nestjs/common';
import DomainModule from '../domain/domain.module';
import UserUseCase from './usecase/UserUseCase';
import { IUserGateway } from './repositories/IUserGateway';

@Module({
  imports: [DomainModule, UserUseCase],
  controllers: [],
  providers: [],
  exports: [UserUseCase],
})
export default class ApplicationModule { }
