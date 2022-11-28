import { AuthModule } from './auth/auth.module'
import { ClientsModule } from './clients/clients.module'
import { CompaniesModule } from './companies/companies.module'
import { CoreModule } from './core/core.module'
import { EmployeesModule } from './employees/employees.module'
import { ProcessModule } from './process/process.module'
import { RecruimentsModule } from './recruiments/recruiments.module'
import { UsersModule } from './users/users.module'

export const MODULES = [
  AuthModule,
  ClientsModule,
  CompaniesModule,
  CoreModule,
  EmployeesModule,
  ProcessModule,
  RecruimentsModule,
  UsersModule
]
