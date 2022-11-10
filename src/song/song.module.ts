import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import {
  Albums,
  Slideshow,
  Groups,
  Channels,
  Like,
  Category,
} from './song.entity';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      Albums,
      Slideshow,
      Groups,
      Channels,
      Like,
      Category,
    ]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}