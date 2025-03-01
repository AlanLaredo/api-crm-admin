import { Module, Global } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import configuration from '../environments/configuration'
import { MONGOOSE_MODELS } from './mongoose/models'
import { MONGOOSE_SERVICES } from './mongoose/services'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([...MONGOOSE_MODELS]),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof configuration>) => {
        const {
          connection,
          user,
          password,
          host,
          authDb,
          defaultDb
        } = configService.mongo

        const uri = `${connection}://${user}:${encodeURIComponent(password)}@${host}/${defaultDb}?authSource=${authDb}`
        return {
          uri,
          user,
          pass: password,
          dbName: defaultDb,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          tlsInsecure: true
        }
      },
      inject: [configuration.KEY]
    })
  ],
  providers: [
    ...MONGOOSE_SERVICES
  ],
  exports: [
    ...MONGOOSE_SERVICES,
    MongooseModule
  ]
})
export class DatabaseModule {
  constructor () {
    console.log('Database module sucessfully initialized (Connected).')
  }
}
