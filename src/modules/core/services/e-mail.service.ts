/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerService } from '@nestjs-modules/mailer'
import { RolePermissionService, UserRoleService, UserService } from 'src/database/mongoose/services/user'
import { Types } from 'mongoose'
import { UserEntity } from 'src/entities/user'

@Injectable()
export class EMailService {
  constructor (private configService: ConfigService,
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    private readonly rolePermissionService: RolePermissionService,
    private readonly mailerService: MailerService) { }

  async send (emailTo: string | string[], subject: string, templateName: string, context: any): Promise<any> {
    const incomingUser: string = this.configService.get<string>('config.mailing.incomingUser')

    return this.mailerService
      .sendMail({
        from: incomingUser,
        to: emailTo,
        subject,
        template: templateName,
        context
      })
  }

  async getUsersForPermissionTagNotification (tag: string, companyId: Types.ObjectId): Promise<UserEntity[]> {
    const rolePermission = await this.rolePermissionService.getOne({ tag })
    const userRoles = await this.userRoleService.get({ permissionsIds: rolePermission.id })
    const userRolesIds = userRoles.map(element => element.id)
    return this.userService.getWhereIn({ companyId }, 'roleAccessId', userRolesIds)
  }
}

// [
//   {
//     accepted: [ 'satu_666@live.com.mx' ],
//     rejected: [],
//     envelopeTime: 143,
//     messageTime: 396,
//     messageSize: 4906,
//     response: '250 2.0.0 OK  1671757991 m12-20020a9d400c000000b0066e80774203sm1012661ote.43 - gsmtp',
//     envelope: { from: 'santiagoalan1@gmail.com', to: [Array] },
//     messageId: '<ce038b4e-d804-c6fe-e3c4-1d6bfdbcc6ad@gmail.com>'
//   }
// ]
