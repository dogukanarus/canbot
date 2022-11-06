import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { BotService } from './bot.service';
import { PacksDto } from './dto/packs.dto';
import { Packs } from './dto/packs.entity';

@ApiBearerAuth()
@ApiTags('packs')
@Controller('bot')
export class BotController {
    constructor(private botService: BotService ){}

    @Post('addPack')
    @FormDataRequest()
    @ApiBody({type: PacksDto})
    addPack(@Body() packsDto: PacksDto): Promise<Packs>{
        return this.botService.addPack(packsDto);
    }
    
    @Get('getPacks')
    getPacks(){
        return this.botService.getPacks();
    }
    
}
