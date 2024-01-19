import { Module } from '@nestjs/common';
import DomainModule from '../domain/domain.module';
import UserUseCase from './usecase/UserUseCase';
import UseCaseModule from './usecase/usecase.module';

@Module({
  imports: [DomainModule, UseCaseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export default class ApplicationModule { }
