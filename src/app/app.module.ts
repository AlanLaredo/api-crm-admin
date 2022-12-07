import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Module } from '@nestjs/common'

import configuration from '../environments/configuration'
import { ENVIRONMENTS, JOI_VALIDATION_SCHEMA } from '../environments'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MODULES } from '../modules'
import errorFormatterFunction from './error-config.function'
import { ApolloDriver } from '@nestjs/apollo'

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
export class AppModule {}
