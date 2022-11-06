import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  fathername: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column()
  ref: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  wallet: number;
}
