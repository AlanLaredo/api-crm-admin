import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

// import { AuthModule } from 'src/auth/auth.module'
import { DatabaseModule } from '../../database/database.module'
import { COMMON_SERVICES } from './shared/services'
import { multerConfig } from './shared/configuration'

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register(multerConfig)
    // CoreModule
  ],
  providers: [
    ...COMMON_SERVICES
    // ...COMMON_RESOLVERS
  ],
  exports: [
    ...COMMON_SERVICES,
    MulterModule
  ]
})
export class CommonModule {
  constructor () {
    console.log('Common module initialized')
  }
}
