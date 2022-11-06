import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    NestjsFormDataModule,
    MulterModule.register({
      dest: './img',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '162.241.194.62',
      port: 3306,
      username: 'ajansl34_botadmin',
      password: 'Oo2?lr13w;aM',
      database: 'ajansl34_canbot',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    BotModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
