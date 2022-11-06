import { Headers, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './jwt-payload.interface';
import { User } from './dto/user.entitiy';
import { SignUpDto } from './dto/signUp.dto';
import { PaymentRepository } from 'src/payment/payment.repository';
import { PaymentDto } from 'src/payment/dto/payment.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private paymentRepository: PaymentRepository,
  ) {}
  // Kayıt olma.
  async signUp(signUpDto: SignUpDto): Promise<User> {
    return this.userRepository.createUser(signUpDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { phone, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ phone });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayLoad = { phone };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  async updatePay(orderNumber: string, paymentDto: PaymentDto): Promise<User> {
    const { status } = paymentDto;
    const pay = await this.paymentRepository.findOne(orderNumber);

    pay.status = status || pay.status;

    await this.paymentRepository.save(pay);

    if (status == 'SUCCESS') {
      const user = await this.userRepository.findOne(pay.id);
      console.log(user);
      user.wallet = Number(user.wallet) + Number(pay.price);
      console.log(user.wallet);
      await this.userRepository.save(user);
    }
    return;
  }

  async decont(orderNumber: string, paymentDto: PaymentDto): Promise<User> {
    const { decont } = paymentDto;
    const pay = await this.paymentRepository.findOne(orderNumber);

    pay.decont = decont || pay.decont;
    await this.paymentRepository.save(pay);
    return;
  }

  async getUser(@Headers('Authorization') authorization = ''): Promise<User> {
    let bearer: string = '';
    if (typeof authorization != 'undefined' && authorization) {
      bearer = authorization.replace('Bearer ', '');
      var decodedJwtAccessToken = this.jwtService.decode(bearer);
      const phone = decodedJwtAccessToken['phone'];
      const user = await this.userRepository.findOne({ phone });
      return user;
    }
    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
  }
}
