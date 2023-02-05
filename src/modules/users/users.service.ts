import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositoryService } from '../global/services/users-repository.service';
import { RESPONSE_MESSAGE } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.getAll();
  }

  async findOne(id: string) {
    return await this.checkExistenceOfUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.checkExistenceOfUser(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new Error(RESPONSE_MESSAGE.YOU_ENTERED_THE_WRONG_CURRENT_PASSWORD);
    }

    return this.usersRepository.updatePassword(id, updateUserDto.newPassword);
  }

  async remove(id: string) {
    await this.checkExistenceOfUser(id);
    await this.usersRepository.remove(id);
  }

  async checkExistenceOfUser(id: string) {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new Error(RESPONSE_MESSAGE.USER_WITH_THIS_UUID_DOESNT_EXIST);
    }

    return user;
  }
}
