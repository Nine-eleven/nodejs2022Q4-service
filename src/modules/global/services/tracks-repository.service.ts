import { Injectable } from '@nestjs/common';
import { Track } from '../../tracks/entities/track.entity';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/entities/user.entity';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { FAVORITE_TYPE, RESPONSE_MESSAGE } from '../../../core/constants';
import { NotFoundError } from '../../../core/errors/NotFoundError';
import { FavoritesRepositoryService } from './favorites-repository.service';

@Injectable()
export class TracksRepositoryService {
  private tracks: Track[] = [];

  constructor(
    private readonly favoritesRepository: FavoritesRepositoryService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track({
      ...createTrackDto,
      id: uuidv4(),
    });
    this.tracks.push(newTrack);

    return newTrack;
  }

  async update(trackId: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((track) => track.id === trackId);

    if (track) {
      Object.entries(updateTrackDto).forEach(([key, value]) => {
        track[key] = value;
      });
      return track;
    } else {
      throw new NotFoundError(
        RESPONSE_MESSAGE.TRACK_WITH_THIS_UUID_DOESNT_EXIST,
      );
    }
  }

  async getById(trackId: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === trackId);
  }

  async getAll() {
    return this.tracks;
  }

  async remove(trackId: string) {
    this.tracks = this.tracks.filter((track) => track.id !== trackId);

    await this.favoritesRepository.removeItem(trackId, FAVORITE_TYPE.TRACK);
  }

  async resetField(id: string, fieldName: 'artistId' | 'albumId') {
    this.tracks = this.tracks.map((track) =>
      track[fieldName] === id ? { ...track, [fieldName]: null } : track,
    );
  }
}
