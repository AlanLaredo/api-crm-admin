import { Module } from '@nestjs/common'

// import { AuthModule } from 'src/auth/auth.module'
import { DatabaseModule } from '../../database/database.module'

@Module({
  imports: [
    DatabaseModule
    // CoreModule
  ],
  providers: [
    // ...COMMON_SERVICES,
    // ...COMMON_RESOLVERS
  ],
  exports: [
    // ...COMMON_SERVICES
  ]
})
export class CommonModule {
  constructor () {
    console.log('Common module initialized')
  }
}
