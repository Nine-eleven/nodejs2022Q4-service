import { Global, Module } from '@nestjs/common';
import { UsersRepositoryService } from './services/users-repository.service';
import { TracksRepositoryService } from './services/tracks-repository.service';
import { ArtistsRepositoryService } from './services/artists-repository.service';

@Global()
@Module({
  providers: [
    UsersRepositoryService,
    TracksRepositoryService,
    ArtistsRepositoryService,
  ],
  exports: [
    UsersRepositoryService,
    TracksRepositoryService,
    ArtistsRepositoryService,
  ],
})
export class GlobalModule {}
