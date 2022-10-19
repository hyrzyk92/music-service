import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { SongDTO } from './song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('c')
  getHello(@Query() query: SongDTO ): string {
    console.log(query.title);
    return this.songService.getHello();
  }

  @Get(':id')
  findOne(@Param() params) {
    console.log(params.id);
    return this.songService.findAll()
  }
}
