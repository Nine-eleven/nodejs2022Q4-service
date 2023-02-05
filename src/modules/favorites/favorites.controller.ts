import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FAVORITE_TYPE } from '../../core/constants';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:uuid')
  addTrack(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.favoritesService.add(uuid, FAVORITE_TYPE.TRACK);
  }

  @HttpCode(204)
  @Delete('track/:uuid')
  removeTrack(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.favoritesService.remove(uuid, FAVORITE_TYPE.TRACK);
  }

  @Post('album/:uuid')
  addAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.favoritesService.add(uuid, FAVORITE_TYPE.ALBUM);
  }

  @HttpCode(204)
  @Delete('album/:uuid')
  removeAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.favoritesService.remove(uuid, FAVORITE_TYPE.ALBUM);
  }

  @Post('artist/:uuid')
  addArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.favoritesService.add(uuid, FAVORITE_TYPE.ARTIST);
  }

  @HttpCode(204)
  @Delete('artist/:uuid')
  removeArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.favoritesService.remove(uuid, FAVORITE_TYPE.ARTIST);
  }
}
