import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Packs {
  @PrimaryGeneratedColumn()
  packID: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  price: number;
}
