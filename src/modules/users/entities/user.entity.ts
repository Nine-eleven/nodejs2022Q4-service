import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(userData: User) {
    Object.entries(userData).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
