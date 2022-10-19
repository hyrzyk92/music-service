import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import env from './env'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: env.username,
      password: env.password,
      database: 'music',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SongModule,
  ],
})
export class AppModule {}
