import { AuthModule } from './auth/auth.module'
import { ClientsModule } from './clients/clients.module'
import { CompaniesModule } from './companies/companies.module'
import { ContactsModule } from './contacts/contacts.module'
import { CoreModule } from './core/core.module'
import { ProcessModule } from './process/process.module'
import { UsersModule } from './users/users.module'

export const MODULES = [
  AuthModule,
  ClientsModule,
  CompaniesModule,
  ContactsModule,
  CoreModule,
  ProcessModule,
  UsersModule
]
