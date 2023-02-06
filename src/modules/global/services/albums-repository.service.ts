import { Injectable } from '@nestjs/common';
import { Album } from '../../albums/entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { FAVORITE_TYPE, RESPONSE_MESSAGE } from '../../../core/constants';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { TracksRepositoryService } from './tracks-repository.service';
import { NotFoundError } from '../../../core/errors/NotFoundError';
import { FavoritesRepositoryService } from './favorites-repository.service';

@Injectable()
export class AlbumsRepositoryService {
  private albums: Album[] = [];

  constructor(
    private readonly tracksRepository: TracksRepositoryService,
    private readonly favoritesRepository: FavoritesRepositoryService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album({
      ...createAlbumDto,
      id: uuidv4(),
    });
    this.albums.push(newAlbum);

    return newAlbum;
  }

  async update(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((album) => album.id === albumId);

    if (album) {
      Object.entries(updateAlbumDto).forEach(([key, value]) => {
        album[key] = value;
      });
      return album;
    } else {
      throw new NotFoundError(
        RESPONSE_MESSAGE.ALBUM_WITH_THIS_UUID_DOESNT_EXIST,
      );
    }
  }

  async getById(albumId: string): Promise<Album | undefined> {
    return this.albums.find((album) => album.id === albumId);
  }

  async getAll() {
    return this.albums;
  }

  async remove(albumId: string) {
    this.albums = this.albums.filter((album) => album.id !== albumId);

    await this.tracksRepository.resetField(albumId, 'albumId');
    await this.favoritesRepository.removeItem(albumId, FAVORITE_TYPE.ALBUM);
  }
}
