import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { BotController } from './bot.controller';
import { BotRepository } from './bot.repository';
import { BotService } from './bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([BotRepository]), NestjsFormDataModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
