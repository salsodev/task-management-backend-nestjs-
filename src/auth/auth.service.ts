import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dtos/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findOne(signInDto.username);

    const isMatch = await bcrypt.compare(signInDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { password, ...loggedInUser } = user;

    const payload = { sub: loggedInUser.id, username: loggedInUser.username };

    const jwt = await this.jwtService.signAsync(payload);

    res.cookie('jwt', jwt, {
      httpOnly: true, // Prevent access via JavaScript
      secure: this.configService.get<string>('NODE_ENV') === 'production', // Use HTTPS in production
      sameSite: 'strict', // Prevent CSRF
      maxAge:
        this.configService.get<number>('JWT_COOKIES_EXPIRES_IN') *
        24 *
        60 *
        60 *
        1000,
    });

    return res.json({ message: 'Logged in successfully' });
  }

  async signUp(createUserDto: CreateUserDto) {
    const hashedPWD = await this.hashPWD(createUserDto.password);
    createUserDto.password = hashedPWD;

    return this.usersService.createUser(createUserDto);
  }

  async logout(res: Response) {
    res.clearCookie('jwt', { expires: new Date(Date.now() - 10000000) });

    res.status(200).json({ message: 'logout successfully' });
  }

  private async hashPWD(plaintext: string) {
    const encryptedText = await bcrypt.hash(plaintext, 12);

    return encryptedText;
  }
}
