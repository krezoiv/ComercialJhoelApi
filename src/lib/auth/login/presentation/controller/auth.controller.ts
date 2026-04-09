import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { LoginDto, LoginQuery } from '../../application/index-auth-application';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this._queryBus.execute<LoginQuery, { access_token: string }>(
      new LoginQuery(dto.userName, dto.password),
    );
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: Request) {
    return req.user;
  }
}
