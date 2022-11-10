import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { SongDTO } from './song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('slideshow')
  slideshow() {
    return this.songService.slideshow();
  }

  @Get('line')
  getLine() {
    return this.songService.getLine();
  }

  @Get('like')
  getLike() {
    return this.songService.getLike();
  }

  @Get('getRecommend')
  getRecommend() {
    return this.songService.getRecommend();
  }

  @Get('/albumList')
  getAlbumList() {
    return this.songService.getAlbumList();
  }

  @Get('/track')
  getTrack(@Query('id') id: string) {
    return this.songService.getTrack(id);
  }
}
