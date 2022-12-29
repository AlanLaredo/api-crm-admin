import { MailerModule } from '@nestjs-modules/mailer'
import { Module, Global } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { ConfigType } from '@nestjs/config'

import { CommonModule } from '../common/common.module'
import { CORE_RESOLVERS } from './resolvers'
import { CORE_TASKS_SERVICES } from './tasks-services'
import configuration from '../../environments/configuration'
import { CORE_CONTROLLERS } from './controllers'
import { CORE_SERVICES } from './services'

@Global()
@Module({
  imports: [
    CommonModule,
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof configuration>) => {
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
              user: configService.mailing.incomingUser,
              pass: configService.mailing.incomingPassword
            }
          },
          defaults: {
            secure: true,
            from: '"nest-modules" <' + configService.mailing.incomingUser + '>'
          },
          template: {
            dir: configService.mailing.templateFolder,
            adapter: new PugAdapter(),
            options: {
              strict: true
            }
          }
        }
      },
      inject: [configuration.KEY]
    })
  ],
  controllers: [
    ...CORE_CONTROLLERS
  ],
  providers: [
    ...CORE_RESOLVERS,
    ...CORE_TASKS_SERVICES,
    ...CORE_SERVICES
  ],
  exports: [
    ...CORE_TASKS_SERVICES,
    ...CORE_SERVICES
  ]
})
export class CoreModule {
  constructor () {
    console.log('Core module sucessfully initialized.')
  }
}
