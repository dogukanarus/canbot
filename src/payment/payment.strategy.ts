import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { User } from 'src/auth/dto/user.entitiy';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class PayStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({});
  }
  async payment(paymentDto, user) {
    const { product, price } = paymentDto;
    const phone = user;
    const query: User = await this.userRepository.findOne({ phone });
    return query;
  }
}
