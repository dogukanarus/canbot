import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { PaymentDto } from 'src/payment/dto/payment.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { SignUpDto } from './dto/signUp.dto';
import { User } from './dto/user.entitiy';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // Kayıt olma.
  @Post('/signup')
  @FormDataRequest()
  @ApiBody({ type: SignUpDto })
  singUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
  @Post('/signin')
  @FormDataRequest()
  @ApiBody({ type: AuthCredentialsDto })
  singIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('updatePay/:orderNumber')
  @FormDataRequest()
  updatePay(
    @Param()
    orderNumber: string,
    @Body() paymentDto: PaymentDto,
  ): Promise<User> {
    return this.authService.updatePay(orderNumber, paymentDto);
  }

  @Post('decont/:orderNumber')
  @FormDataRequest()
  decont(
    @Param()
    orderNumber: string,
    @Body() paymentDto: PaymentDto,
  ): Promise<User> {
    return this.authService.decont(orderNumber, paymentDto);
  }

  @Get('/getuser')
  getUser(@Headers('Authorization') authorization = ''): Promise<User> {
    return this.authService.getUser(authorization);
  }
}
