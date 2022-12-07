import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as bodyParser from 'body-parser'

import { AppModule } from './app/app.module'

async function bootstrap () {
  const app = await NestFactory.create(
    AppModule
  )

  app.use(bodyParser.json({ limit: '200mb' }))
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true
  }))

  const configService = app.get(ConfigService)
  await app.listen(configService.get('SYSTEM_PORT'))
}
bootstrap()
