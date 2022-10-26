import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Albums {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  cover: string;

  @Column()
  playCount: string;
}

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