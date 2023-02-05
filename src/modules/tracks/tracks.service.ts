import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepositoryService } from '../global/services/tracks-repository.service';
import { RESPONSE_MESSAGE } from '../../core/constants';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepositoryService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.create(createTrackDto);
  }

  async findAll() {
    return await this.tracksRepository.getAll();
  }

  async findOne(id: string) {
    return await this.checkExistenceOfTrack(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.checkExistenceOfTrack(id);
    return this.tracksRepository.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.checkExistenceOfTrack(id);
    await this.tracksRepository.remove(id);
  }

  async checkExistenceOfTrack(id: string) {
    const track = await this.tracksRepository.getById(id);

    if (!track) {
      throw new Error(RESPONSE_MESSAGE.TRACK_WITH_THIS_UUID_DOESNT_EXIST);
    }

    return track;
  }
}
