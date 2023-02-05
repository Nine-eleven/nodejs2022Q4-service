import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersRepositoryService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const newUser = new User({
      ...createUserDto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });
    this.users.push(newUser);

    return newUser;
  }

  async updatePassword(userId: string, newPassword: string) {
    const user = this.users.find((user) => user.id === userId);

    if (user) {
      user.password = newPassword;
      user.version = ++user.version;
      user.updatedAt = Date.now();
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  async getById(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === userId);
  }

  async getAll() {
    return this.users;
  }

  async remove(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
