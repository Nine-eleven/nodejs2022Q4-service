import { Global, Module } from '@nestjs/common';
import { UsersRepositoryService } from './services/users-repository.service';

@Global()
@Module({
  providers: [UsersRepositoryService],
  exports: [UsersRepositoryService],
})
export class GlobalModule {}
