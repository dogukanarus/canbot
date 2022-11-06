import { EntityRepository, Repository } from 'typeorm';
import { Payment } from './dto/payment.entity';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
  async payment(paymentDto, result) {
    const { product, price } = paymentDto;
    const order = this.create({
      product,
      price,
      paymentMethod: 'Online',
      id: result,
      status: 'PENDING',
    });
    this.save(order);
    return order;
  }
}
