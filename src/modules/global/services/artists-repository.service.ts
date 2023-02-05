import { Injectable } from '@nestjs/common';
import { Artist } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { FAVORITE_TYPE, RESPONSE_MESSAGE } from '../../../core/constants';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { Track } from '../../tracks/entities/track.entity';
import { TracksRepositoryService } from './tracks-repository.service';
import { NotFoundError } from '../../../core/errors/NotFoundError';
import { FavoritesRepositoryService } from './favorites-repository.service';

@Injectable()
export class ArtistsRepositoryService {
  private artists: Artist[] = [];

  constructor(
    private readonly tracksRepository: TracksRepositoryService,
    private readonly favoritesRepository: FavoritesRepositoryService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist({
      ...createArtistDto,
      id: uuidv4(),
    });
    this.artists.push(newArtist);

    return newArtist;
  }

  async update(artistId: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.find((artist) => artist.id === artistId);

    if (artist) {
      Object.entries(updateArtistDto).forEach(([key, value]) => {
        artist[key] = value;
      });
      return artist;
    } else {
      throw new NotFoundError(
        RESPONSE_MESSAGE.ARTIST_WITH_THIS_UUID_DOESNT_EXIST,
      );
    }
  }

  async getById(artistId: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id === artistId);
  }

  async getAll() {
    return this.artists;
  }

  async remove(artistId: string) {
    this.artists = this.artists.filter((artist) => artist.id !== artistId);

    await this.tracksRepository.resetField(artistId, 'artistId');
    await this.favoritesRepository.removeItem(artistId, FAVORITE_TYPE.ARTIST);
  }
}
