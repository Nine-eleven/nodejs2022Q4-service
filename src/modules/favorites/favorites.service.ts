import { Injectable } from '@nestjs/common';
import { FAVORITE_TYPE, RESPONSE_MESSAGE } from '../../core/constants';
import { AddFavoriteItemError } from '../../core/errors/AddFavoriteItemError';
import { TracksRepositoryService } from '../global/services/tracks-repository.service';
import { ArtistsRepositoryService } from '../global/services/artists-repository.service';
import { AlbumsRepositoryService } from '../global/services/albums-repository.service';
import { FavoritesRepositoryService } from '../global/services/favorites-repository.service';
import { NotFoundError } from '../../core/errors/NotFoundError';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly tracksRepository: TracksRepositoryService,
    private readonly artistsRepository: ArtistsRepositoryService,
    private readonly albumsRepository: AlbumsRepositoryService,
    private readonly favoriteRepository: FavoritesRepositoryService,
  ) {}

  async findAll() {
    const favoritesIds = await this.favoriteRepository.getAll();

    return {
      artists: await Promise.all(
        favoritesIds.artists.map((id) => this.artistsRepository.getById(id)),
      ),
      albums: await Promise.all(
        favoritesIds.albums.map((id) => this.albumsRepository.getById(id)),
      ),
      tracks: await Promise.all(
        favoritesIds.tracks.map((id) => this.tracksRepository.getById(id)),
      ),
    };
  }

  async add(id: string, type: FAVORITE_TYPE) {
    switch (type) {
      case FAVORITE_TYPE.TRACK:
        const track = await this.tracksRepository.getById(id);
        if (!track)
          throw new AddFavoriteItemError(
            RESPONSE_MESSAGE.TRACK_WITH_THIS_UUID_DOESNT_EXIST,
          );
        await this.favoriteRepository.addItem(track);
        return RESPONSE_MESSAGE.TRACK_ADDED_TO_FAVORITES_SUCCESSFULLY;
      case FAVORITE_TYPE.ARTIST:
        const artist = await this.artistsRepository.getById(id);
        if (!artist)
          throw new AddFavoriteItemError(
            RESPONSE_MESSAGE.ARTIST_WITH_THIS_UUID_DOESNT_EXIST,
          );
        await this.favoriteRepository.addItem(artist);
        return RESPONSE_MESSAGE.ARTIST_ADDED_TO_FAVORITES_SUCCESSFULLY;
      case FAVORITE_TYPE.ALBUM:
        const album = await this.albumsRepository.getById(id);
        if (!album)
          throw new AddFavoriteItemError(
            RESPONSE_MESSAGE.ALBUM_WITH_THIS_UUID_DOESNT_EXIST,
          );
        await this.favoriteRepository.addItem(album);
        return RESPONSE_MESSAGE.ALBUM_ADDED_TO_FAVORITES_SUCCESSFULLY;
      default:
        throw new Error();
    }
  }

  async remove(id: string, type: FAVORITE_TYPE) {
    switch (type) {
      case FAVORITE_TYPE.TRACK:
        const trackId = await this.favoriteRepository.getItemById(
          id,
          FAVORITE_TYPE.TRACK,
        );
        if (!trackId)
          throw new NotFoundError(
            RESPONSE_MESSAGE.TRACK_WITH_THIS_UUID_DOESNT_EXIST,
          );
        await this.favoriteRepository.removeItem(trackId, FAVORITE_TYPE.TRACK);
        return RESPONSE_MESSAGE.TRACK_SUCCESSFULLY_REMOVED_FROM_FAVORITES;
      case FAVORITE_TYPE.ARTIST:
        const artistId = await this.favoriteRepository.getItemById(
          id,
          FAVORITE_TYPE.ARTIST,
        );
        if (!artistId)
          throw new NotFoundError(
            RESPONSE_MESSAGE.ARTIST_WITH_THIS_UUID_DOESNT_EXIST,
          );
        await this.favoriteRepository.removeItem(
          artistId,
          FAVORITE_TYPE.ARTIST,
        );
        return RESPONSE_MESSAGE.ARTIST_SUCCESSFULLY_REMOVED_FROM_FAVORITES;
      case FAVORITE_TYPE.ALBUM:
        const albumId = await this.favoriteRepository.getItemById(
          id,
          FAVORITE_TYPE.ALBUM,
        );
        if (!albumId)
          throw new NotFoundError(
            RESPONSE_MESSAGE.ALBUM_WITH_THIS_UUID_DOESNT_EXIST,
          );
        await this.favoriteRepository.removeItem(albumId, FAVORITE_TYPE.ALBUM);
        return RESPONSE_MESSAGE.ALBUM_SUCCESSFULLY_REMOVED_FROM_FAVORITES;
      default:
        throw new Error();
    }
  }
}
