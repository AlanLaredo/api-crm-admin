import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ENVIRONMENTS, JOI_VALIDATION_SCHEMA } from '../../environments/'
import config from '../../environments/environments.config'

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ENVIRONMENTS[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
    validationSchema: JOI_VALIDATION_SCHEMA
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
