// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
// import { GraphQLModule } from '@nestjs/graphql'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from '../environments/config'
import { ENVIRONMENTS, JOI_VALIDATION_SCHEMA } from '../environments'
import { MODULES } from '../modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENVIRONMENTS[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: JOI_VALIDATION_SCHEMA
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   // TODO: check this property @Alan installSubscriptionHandlers: true,
    //   autoSchemaFile: 'admin-schemas.gql',
    //   playground: true,
    //   path: '/admin'
    // }),
    ...MODULES
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
