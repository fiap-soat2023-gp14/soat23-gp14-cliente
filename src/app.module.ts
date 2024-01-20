import { Module } from '@nestjs/common';
import ApplicationModule from './core/application/application.module';
import DomainModule from './core/domain/domain.module';
import InfrastructureModule from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DomainModule,
    InfrastructureModule,
    ApplicationModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      synchronize: true,
      entities: [`${__dirname}/**/entity/*{.ts,.js}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
