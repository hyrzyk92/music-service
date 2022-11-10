import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

//音频集合
@Entity()
export class Albums {
  @PrimaryGeneratedColumn()
  albumId: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  cover: string;

  @Column()
  playCount: string;

  @Column()
  nickname: string;

  @Column()
  categoryId: number;
}
//轮播图
@Entity()
export class Slideshow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coverPath: string;

  @Column()
  url: string;

  @Column()
  longTitle: string;
}
//组
@Entity()
export class Groups {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  groupName: string;

  @Column()
  groupLink: string;
}
//频道
@Entity()
export class Channels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  channelId: number;

  @Column()
  channelName: string;

  @Column()
  channelLink: string;
}
//猜你喜欢
@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  albumId: number;

}

//分类
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  title: string;

  @Column()
  moreUrl: string;

  @Column()
  hotword: string;

}