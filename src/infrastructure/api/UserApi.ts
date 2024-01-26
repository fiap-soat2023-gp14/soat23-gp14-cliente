import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';


import { UserController } from '../controller/UserController';
import { UserCreationDTO } from '../../core/application/dto/UserCreationDTO';
import UserFilter from 'src/core/domain/entities/UserFilter';

@Controller('users')
export default class UserApi {
  constructor(
    @Inject(UserController) private useControler: UserController
  ) { }

  @Post()
  async createUser(@Res() response, @Body() userCreationDto: UserCreationDTO) {
    const user = await this.useControler.createUser(
      userCreationDto
    );
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  getAllUsers(@Query() params: UserFilter) {
    return this.useControler.getAllUsers(params);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.useControler.getUserById(id);
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() userDto: UserCreationDTO,
  ) {
    await this.useControler.updateUser(id, userDto);
    return response.status(HttpStatus.OK).json();
  }
}
