import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import UserApi from './api/UserApi';
import { MongoConnection } from './adapters/external/MongoConnection';
import { IConnection } from './adapters/external/IConnection';

@Module({
  imports: [ApplicationModule],
  controllers: [UserApi],
  providers: [
    {
      provide: IConnection,
      useClass: MongoConnection,
    },
  ]
})
export default class InfrastructureModule {}
