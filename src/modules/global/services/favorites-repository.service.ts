import { Injectable } from '@nestjs/common';
import { Track } from '../../tracks/entities/track.entity';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { FAVORITE_TYPE } from '../../../core/constants';

@Injectable()
export class FavoritesRepositoryService {
  private tracks: Track[] = [];
  private albums: Album[] = [];
  private artists: Artist[] = [];

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
  ): Promise<Track | Artist | Album | undefined> {
    if (type === FAVORITE_TYPE.TRACK) {
      return this.tracks.find((track) => track.id === itemId);
    } else if (type === FAVORITE_TYPE.ARTIST) {
      return this.artists.find((artist) => artist.id === itemId);
    } else if (type === FAVORITE_TYPE.ALBUM) {
      return this.albums.find((album) => album.id === itemId);
    }
  }

  async addItem(item: Track | Artist | Album) {
    if (item instanceof Track) {
      this.tracks.push(item);
    } else if (item instanceof Artist) {
      this.artists.push(item);
    } else if (item instanceof Album) {
      this.albums.push(item);
    }
  }

  async removeItem(itemId: string, type: FAVORITE_TYPE) {
    if (type === FAVORITE_TYPE.TRACK) {
      this.tracks = this.tracks.filter((track) => track.id !== itemId);
    } else if (type === FAVORITE_TYPE.ARTIST) {
      this.artists = this.artists.filter((artist) => artist.id !== itemId);
    } else if (type === FAVORITE_TYPE.ALBUM) {
      this.albums = this.albums.filter((album) => album.id !== itemId);
    }
  }
}
