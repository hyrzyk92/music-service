import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Albums,
  Slideshow,
  Groups,
  Channels,
  Like,
  Category,
} from './song.entity';
import { SongDTO } from './song.dto';
import { HttpService } from '@nestjs/axios'
import { catchError, lastValueFrom } from 'rxjs'
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager'

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
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache,
  ) {}

  async index() {
    return 1
  }

  //获取轮播图
  async slideshow() {
    let data = await this.cacheManager.get('slideshow');

    if (!data) {
      data = await this.slideshowRepository.find();
      const res = await this.cacheManager.set('slideshow', data, 3600)
      console.log(res)
    }
    
    return {
      ret: 200,
      data: data,
    };
  }
  //获取组和频道
  async getLine() {
    const groups = await this.groupsRepository.find();
    let res = groups.map((group) => ({ ...group, channels: null }));
    let ps = [];
    groups.forEach((item, index) => {
      ps[index] = new Promise<void>(async (resolve) => {
        const data = await this.channelsRepository.findBy({
          groupId: item.groupId,
        });
        res[index].channels = data;
        resolve();
      });
    });
    await Promise.all([...ps]);
    return {
      ret: 200,
      data: {
        groups: res,
      },
    };
  }

  //获取猜你喜欢
  async getLike() {
    const likes = await this.likeRepository.find();
    let res = [];
    let ps = [];
    likes.forEach((item, index) => {
      ps[index] = new Promise<void>(async (resolve) => {
        const data = await this.albumsRepository.findOneBy({
          albumId: item.albumId,
        });
        res[index] = data;
        resolve();
      });
    });
    await Promise.all([...ps]);
    return {
      ret: 200,
      data: {
        count: res.length,
        list: res,
      },
    };
  }

  //获取分类
  async getRecommend() {
    const category = await this.CategoryRepository.find();
    let res = category.map((item) => ({
      ...item,
      albumList: null,
      soar: null,
    }));
    let ps = [];
    category.forEach((item, index) => {
      ps[index] = new Promise<void>(async (resolve) => {
        const data1 = await this.albumsRepository.find({
          where: {
            categoryId: item.categoryId,
          },
          take: 10,
          cache: true,
        });
        const data2 = await this.albumsRepository.find({
          where: {
            categoryId: item.categoryId,
          },
          order: {
            playCount: 'DESC'
          },
          take: 6,
          cache: true,
        });
        res[index].albumList = data1;
        res[index].soar = data2;
        resolve();
      });
    });
    await Promise.all([...ps]);
    return {
      ret: 200,
      data: {
        count: res.length,
        list: res,
      },
    };
  }

  //获取某个album子列表
  async getAlbumList() {
    const { data } = await lastValueFrom(
      this.httpService
        .get(
          'https://www.ximalaya.com/revision/play/v1/show?id=13396678&num=1&sort=-1&size=30&ptype=0',
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error)
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async getTrack(id) {
    const { data } = await lastValueFrom(
      this.httpService
        .get(`https://www.ximalaya.com/revision/play/v1/audio?id=${id}&ptype=1`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error)
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

}
