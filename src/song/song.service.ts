import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Albums, Slideshow, Groups, Channels } from './song.entity';
import { SongDTO } from './song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Albums)
    private albumsRepository: Repository<Albums>,
    @InjectRepository(Slideshow)
    private slideshowRepository: Repository<Slideshow>,
    @InjectRepository(Groups)
    private groupsRepository: Repository<Groups>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
  ) {}

  async slideshow() {
    const data = await this.slideshowRepository.find();
    return {
      ret: 0,
      data: data  
    }
  }

  async getLine() {
    const groups = await this.groupsRepository.find()
    let res = groups.map((group) => ({ ...group, channels: null }));
    let ps = []
    groups.forEach((item, index) => {
      ps[index] = new Promise<void>(async (resolve) => {
        const data = await this.channelsRepository.findBy({
          groupId: item.groupId,
        });
        res[index].channels = data
        resolve()
      })
    })
    await Promise.all([...ps])
    return {
      ret: 0,
      data: {
        groups: res
      }
    }
  }

  async findAll(): Promise<SongDTO[]> {
    return await this.albumsRepository.find();
  }

  async findOne(id: number): Promise<SongDTO> {
    return await this.albumsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.albumsRepository.delete(id);
  }
}
