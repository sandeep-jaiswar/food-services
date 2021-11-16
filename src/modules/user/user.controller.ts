import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidateObjectId } from '../../core/pipes/validate-object-id.pipes';

@Controller('api/user')
export class UserController {
  constructor(private service: UserService) {}

  // Submit a post
  @Post('')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.service.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been submitted successfully!',
      user: newUser,
    });
  }

  // Fetch a particular post using ID
  @Get(':id')
  async getUser(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const user = await this.service.getUser(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json(user);
  }

  // Fetch all users
  @Get('')
  async getUsers(@Res() res) {
    const users = await this.service.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Put('')
  async editUser(
    @Res() res,
    @Query('id', new ValidateObjectId()) id,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const editedUser = await this.service.editUser(id, createUserDTO);
    if (!editedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user: editedUser,
    });
  }
  // Delete a user using ID
  @Delete('')
  async deleteUser(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const deletedUser = await this.service.deleteUser(id);
    if (!deletedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted!',
      user: deletedUser,
    });
  }
}
