import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import config from '../../../environments/configuration'

import { Strategy, ExtractJwt } from 'passport-jwt'
import { IToken } from '../shared/interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.security.jwtSecret
    })
  }

  validate (payload: IToken) {
    return payload
  }
}
