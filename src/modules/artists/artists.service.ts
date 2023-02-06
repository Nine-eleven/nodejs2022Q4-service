import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepositoryService } from '../global/services/artists-repository.service';
import { RESPONSE_MESSAGE } from '../../core/constants';
import { NotFoundError } from '../../core/errors/NotFoundError';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepositoryService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsRepository.create(createArtistDto);
  }

  async findAll() {
    return await this.artistsRepository.getAll();
  }

  async findOne(id: string) {
    return await this.checkExistenceOfArtist(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.checkExistenceOfArtist(id);
    return await this.artistsRepository.update(id, updateArtistDto);
  }

  async remove(id: string) {
    await this.checkExistenceOfArtist(id);
    await this.artistsRepository.remove(id);
  }

  async checkExistenceOfArtist(id: string) {
    const artist = await this.artistsRepository.getById(id);

    if (!artist) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.ARTIST_WITH_THIS_UUID_DOESNT_EXIST,
      );
    }

    return artist;
  }
}
