import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  translatable_title: number;

  @Column()
  premiere_date: Date;

  @Column()
  movie_link: string;

  @Column()
  description: string;

  @Column()
  donation_link: string;

  @Column()
  created_at: Date;
}
