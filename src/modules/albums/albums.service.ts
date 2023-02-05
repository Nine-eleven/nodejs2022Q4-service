import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepositoryService } from '../global/services/albums-repository.service';
import { RESPONSE_MESSAGE } from '../../core/constants';
import { NotFoundError } from '../../core/errors/NotFoundError';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: AlbumsRepositoryService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumsRepository.getAll();
  }

  async findOne(id: string) {
    return await this.checkExistenceOfAlbum(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.checkExistenceOfAlbum(id);
    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.checkExistenceOfAlbum(id);
    return this.albumsRepository.remove(id);
  }

  async checkExistenceOfAlbum(id: string) {
    const album = await this.albumsRepository.getById(id);

    if (!album) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.ALBUM_WITH_THIS_UUID_DOESNT_EXIST,
      );
    }

    return album;
  }
}
