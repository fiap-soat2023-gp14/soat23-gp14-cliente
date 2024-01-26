import { Module } from '@nestjs/common';
import DomainModule from '../domain/domain.module';
import { UserCreationDTO } from './dto/UserCreationDTO';

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [UserCreationDTO],
  exports: [],
})
export default class ApplicationModule { }
