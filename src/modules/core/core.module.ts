import { Module, Global } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CommonModule } from '../common/common.module'
import { CORE_RESOLVERS } from './resolvers'
import { CORE_TASKS_SERVICES } from './tasks-services'

@Global()
@Module({
  imports: [
    CommonModule,
    ScheduleModule.forRoot()
  ],
  providers: [
    ...CORE_RESOLVERS,
    ...CORE_TASKS_SERVICES
  ],
  exports: [...CORE_TASKS_SERVICES]
})
export class CoreModule {
  constructor () {
    console.log('Core module sucessfully initialized.')
  }
}
