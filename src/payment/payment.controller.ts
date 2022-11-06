import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FilterDto } from './dto/filter.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@ApiBearerAuth()
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('payment')
  @FormDataRequest()
  @ApiBody({ type: PaymentDto })
  payment(
    @Body() paymentDto: PaymentDto,
    @Headers('Authorization') authorization = '',
  ) {
    return this.paymentService.payment(paymentDto, authorization);
  }
  @Get('/history/:id')
  getHistory(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() filterDto: FilterDto,
  ) {
    return this.paymentService.getHistory(id, filterDto);
  }
}
