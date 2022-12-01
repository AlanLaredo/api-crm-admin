import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigType } from '@nestjs/config'

import configuration from '../../environments/configuration'
import { CommonModule } from '../common/common.module'
import { LocalStrategy } from './strategies/local.strategy'

import { AUTH_CONTROLLERS } from './controllers'
import { AUTH_SERVICES } from './services'
import { JwtStrategy } from './strategies'

@Global()
@Module({
  imports: [
    CommonModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { jwtSecret, jwtExpiresIn } = configService.security
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtExpiresIn
          }
        }
      }
    })
  ],
  controllers: [
    ...AUTH_CONTROLLERS
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ...AUTH_SERVICES
  ],
  exports: [
    ...AUTH_SERVICES
  ]
})
export class AuthModule {
  constructor () {
    console.log('Auth module sucessfully initialized.')
  }
}
