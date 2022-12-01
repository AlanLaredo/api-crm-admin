import { AuthModule } from './auth/auth.module'
import { ClientModule } from './client/client.module'
import { CompanyModule } from './company/company.module'
import { CoreModule } from './core/core.module'
import { EmployeeModule } from './employee/employee.module'
import { ProcessModule } from './process/process.module'
import { RecruimentModule } from './recruiment/recruiment.module'
import { UserModule } from './user/user.module'

export const MODULES = [
  AuthModule,
  ClientModule,
  CompanyModule,
  CoreModule,
  EmployeeModule,
  ProcessModule,
  RecruimentModule,
  UserModule
]
