import { Injectable } from '@nestjs/common';
import { Track } from '../../tracks/entities/track.entity';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { FAVORITE_TYPE } from '../../../core/constants';

@Injectable()
export class FavoritesRepositoryService {
  private tracks: string[] = [];
  private albums: string[] = [];
  private artists: string[] = [];

  async getAll() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  async getItemById(
    itemId: string,
    type: FAVORITE_TYPE,
  ): Promise<string | undefined> {
    if (type === FAVORITE_TYPE.TRACK) {
      return this.tracks.find((trackId) => trackId === itemId);
    } else if (type === FAVORITE_TYPE.ARTIST) {
      return this.artists.find((artistId) => artistId === itemId);
    } else if (type === FAVORITE_TYPE.ALBUM) {
      return this.albums.find((albumId) => albumId === itemId);
    }
  }

  async addItem(item: Track | Artist | Album) {
    if (item instanceof Track) {
      this.tracks.push(item.id);
    } else if (item instanceof Artist) {
      this.artists.push(item.id);
    } else if (item instanceof Album) {
      this.albums.push(item.id);
    }
  }

  async removeItem(itemId: string, type: FAVORITE_TYPE) {
    if (type === FAVORITE_TYPE.TRACK) {
      this.tracks = this.tracks.filter((trackId) => trackId !== itemId);
    } else if (type === FAVORITE_TYPE.ARTIST) {
      this.artists = this.artists.filter((artistId) => artistId !== itemId);
    } else if (type === FAVORITE_TYPE.ALBUM) {
      this.albums = this.albums.filter((albumId) => albumId !== itemId);
    }
  }
}
