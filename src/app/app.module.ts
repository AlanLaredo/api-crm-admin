import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ENVIRONMENTS, JOI_VALIDATION_SCHEMA } from '../environments'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from '../environments/config'
import { MODULES } from '../modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENVIRONMENTS[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: JOI_VALIDATION_SCHEMA
    }),
    ...MODULES
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
