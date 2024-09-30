import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { NextFunction } from 'express';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(private configService: ConfigService) {
  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: configService.get<string>('JWT_SECRET')
  });
}
  async validate(payload: any){
    console.log('Decoded JWT payloadd:', payload);
    Logger.log('Decoded JWT payload:', payload);
    return {userId: payload.sub, username: payload.username};
  }
}