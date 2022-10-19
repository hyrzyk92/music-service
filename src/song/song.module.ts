import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { Albums } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Albums])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}