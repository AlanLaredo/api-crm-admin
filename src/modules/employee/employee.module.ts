import { Module, Global } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { EMPLOYEE_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...EMPLOYEE_RESOLVERS
  ],
  exports: []
})
export class EmployeeModule {
  constructor () {
    console.log('Employee module sucessfully initialized.')
  }
}
