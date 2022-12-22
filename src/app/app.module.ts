import { ConfigModule } from '@nestjs/config'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { Module } from '@nestjs/common'
import { ApolloDriver } from '@nestjs/apollo'
import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

import configuration from '../environments/configuration'
import { ENVIRONMENTS, JOI_VALIDATION_SCHEMA } from '../environments'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MODULES } from '../modules'
// import errorFormatterFunction from './error-config.function'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENVIRONMENTS[process.env.NODE_ENV] || '.env',
      load: [configuration],
      isGlobal: true,
      validationSchema: JOI_VALIDATION_SCHEMA
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'crm-schemas.gql',
      path: '/admin',
      playground: true
    } as GqlModuleOptions),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: process.env.MAILDEV_INCOMING_USER,
            pass: process.env.MAILDEV_INCOMING_PASS
          }
        },
        defaults: {
          secure: true,
          from: '"nest-modules" <santiagoalan1@gmail.com>'
        },
        template: {
          dir: process.env.MAILER_DIR_TEMPLATE,
          adapter: new PugAdapter(),
          options: {
            strict: true
          }
        }
      })
    }),
    // GraphQLModule.forRoot<MercuriusDriverConfig>({
    //   driver: MercuriusDriver,
    //   autoSchemaFile: 'crm-schemas.gql',
    //   path: '/admin',
    //   graphiql: true,
    //   errorFormatter: errorFormatterFunction
    // } as MercuriusDriverConfig),
    ...MODULES
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {

}
