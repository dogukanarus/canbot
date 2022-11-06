import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  orderNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: string;

  @Column()
  product: string;

  @Column()
  paymentMethod: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  price: number;

  @Column()
  id: string;

  @Column()
  status: string;

  @Column()
  decont: string;
}
