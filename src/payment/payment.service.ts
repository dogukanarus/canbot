import { Headers, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { FilterDto } from './dto/filter.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentRepository } from './payment.repository';
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async payment(
    paymentDto: PaymentDto,
    @Headers('Authorization') authorization = '',
  ) {
    let bearer: string = '';
    let user;
    let result;
    if (typeof authorization != 'undefined' && authorization) {
      bearer = authorization.replace('Bearer ', '');
      var decodedJwtAccessToken = this.jwtService.decode(bearer);
      user = decodedJwtAccessToken['phone'];
    }
    const phone = user;
    const query = await this.userRepository.findOne({ phone });
    result = query.id;
    return this.paymentRepository.payment(paymentDto, result);
  }

  async getHistory(id: string, filterDto: FilterDto) {
    const { status } = filterDto;
    const query = this.paymentRepository
      .createQueryBuilder('c')
      .where('id = :id', { id });

    if (status) {
      query.andWhere('c.status = :status', { status });
    }
    const result = await query.getMany();
    return result;
  }
}
