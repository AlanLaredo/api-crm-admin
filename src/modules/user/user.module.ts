import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Types } from 'mongoose'
import { UserRoleService, UserService } from 'src/database/mongoose/services/user'
import { UserEntity, UserRoleEntity } from 'src/entities/user'
import { AuthService } from '../auth/services'

import { CommonModule } from '../common/common.module'
import { USER_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...USER_RESOLVERS
  ],
  exports: []
})
export class UserModule {
  constructor (private userService: UserService,
    private userRoleService: UserRoleService,
    private authService: AuthService,
    private configService: ConfigService) {
    console.log('User module sucessfully initialized.')
    this.initialConfiguration()
  }

  async initialConfiguration () {
    let userRoleAdmin = await this.userRoleService.getOne({
      name: 'CrmAdmin'
    })

    if (!userRoleAdmin) {
      userRoleAdmin = await this.createUserRole()
    }

    const adminUser = await this.userService.getOne({
      roleAccessId: userRoleAdmin.id
    })

    if (!adminUser) {
      this.createAdminUser(userRoleAdmin.id)
    }
  }

  async createUserRole () {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')
    const userRole: any = {
      name: 'CrmAdmin',
      description: 'Este rol es solo para usuarios administradores de CRM. No se puede editar.',
      createdAt: new Date(),
      createdBy: new Types.ObjectId(systemId)
    }
    return this.userRoleService.create(userRole)
  }

  async createAdminUser (id: Types.ObjectId) {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')
    const defaultPassword: string = this.configService.get<string>('config.mongo.defaultPassword')
    const hashedPassword: string = await this.authService.getHashPassword(defaultPassword)
    // new Types.ObjectId(systemId)
    const data: UserEntity = {
      username: 'admin',
      firstName: 'CrmAdmin',
      password: hashedPassword, // changue this, pls
      email: 'admin@crm.com',
      roleAccessId: id,
      createdBy: new Types.ObjectId(systemId),
      createdAt: new Date()
    }
    return await this.userService.create(data)
  }
}
