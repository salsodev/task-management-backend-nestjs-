import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/SignIn.dto';
import { SignUpDto } from './dtos/SignUp.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body(ValidationPipe) signInDto: SignInDto,
    @Res() res: Response,
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async register(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
