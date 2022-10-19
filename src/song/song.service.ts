import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Albums } from './song.entity';
import { SongDTO } from './song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Albums)
    private songsRepository: Repository<Albums>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<SongDTO[]> {
    return await this.songsRepository.find();
  }

  async findOne(id: number): Promise<SongDTO> {
    return await this.songsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.songsRepository.delete(id);
  }
}
