import { Global, Module } from '@nestjs/common';
import { UsersRepositoryService } from './services/users-repository.service';
import { TracksRepositoryService } from './services/tracks-repository.service';
import { ArtistsRepositoryService } from './services/artists-repository.service';
import { AlbumsRepositoryService } from './services/albums-repository.service';
import { FavoritesRepositoryService } from './services/favorites-repository.service';

@Global()
@Module({
  providers: [
    UsersRepositoryService,
    TracksRepositoryService,
    ArtistsRepositoryService,
    AlbumsRepositoryService,
    FavoritesRepositoryService,
  ],
  exports: [
    UsersRepositoryService,
    TracksRepositoryService,
    ArtistsRepositoryService,
    AlbumsRepositoryService,
    FavoritesRepositoryService,
  ],
})
export class GlobalModule {}
