import { CacheModule, Module } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      Albums,
      Slideshow,
      Groups,
      Channels,
      Like,
      Category,
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-ignore
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: +configService.get('REDIS_PORT'),
          },
          password: configService.get('REDIS_PASSWORD'),
        });

        return {
          store: store,
          ttl: 60 * 60 * 24 * 7, // 1 week
        };
      },
    }),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}