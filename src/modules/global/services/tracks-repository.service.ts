import { Injectable } from '@nestjs/common';
import { Track } from '../../tracks/entities/track.entity';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/entities/user.entity';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { RESPONSE_MESSAGE } from '../../../core/constants';

@Injectable()
export class TracksRepositoryService {
  private tracks: Track[] = [];

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
      throw new Error(RESPONSE_MESSAGE.TRACK_WITH_THIS_UUID_DOESNT_EXIST);
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
  }

  async removeArtistId(artistId: string) {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }
}
