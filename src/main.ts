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
    forbidUnknownValues: false
  }))

  const configService = app.get(ConfigService)
  // const server = app.getHttpServer()
  // const router = server._events.request._router

  // const availableRoutes: [] = router.stack.map(
  //   (layer: any) => {
  //     if (layer.route) {
  //       return {
  //         route: {
  //           path: layer.route?.path,
  //           method: layer.route?.stack[0].method
  //         }
  //       }
  //     }
  //   }).filter(item => item !== undefined)
  // console.log(availableRoutes)

  await app.listen(configService.get('SYSTEM_PORT'))
}
bootstrap()
