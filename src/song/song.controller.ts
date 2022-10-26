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

  // @Get(':id')
  // findOne(@Param() params) {
  //   console.log(params.id);
  //   return this.songService.findAll()
  // }
}
