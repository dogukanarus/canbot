import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository, UserRepository]),
    NestjsFormDataModule,
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 604800,
      },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
