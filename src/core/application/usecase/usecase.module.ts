import { Module } from "@nestjs/common";
import UserUseCase from "./UserUseCase";

@Module({
  imports: [],
  controllers: [],
  providers: [UserUseCase],
  exports: [UserUseCase]
})
export default class UseCaseModule { }