import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BotRepository } from './bot.repository';
import { PacksDto } from './dto/packs.dto';
import { Packs } from './dto/packs.entity';

@Injectable()
export class BotService {
    constructor(
        @InjectRepository(BotRepository)
        private botRepository: BotRepository,
         ){}

    async addPack(packsDto: PacksDto): Promise<Packs> {
        return this.botRepository.addPack(packsDto);
    } 

    async getPacks(){
        return this.botRepository.getPacks();
    }
}
