/* eslint-disable no-useless-constructor */
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron } from '@nestjs/schedule'
import { DateTime } from 'luxon'
import { Types } from 'mongoose'

import { CustomerService, ProcessService } from 'src/database/mongoose/services/process'
import { UserService } from 'src/database/mongoose/services/user'
import { CustomerEntity, ProcessEntity } from 'src/entities/process'
import { UserEntity } from 'src/entities/user'
import { BlProjectedDataService } from 'src/modules/client/services'
import { EMailService } from '../services'
@Injectable()
export class AlertTaskService {
  private readonly logger = new Logger(AlertTaskService.name)

  constructor (private configService: ConfigService,
    private customerService: CustomerService,
    private emailService: EMailService,
    private userService: UserService,
    private processService: ProcessService,
    private blProjectedDataService: BlProjectedDataService) { }

  @Cron('*/10 * * * * *')
  async handleCronEveryMinuteEmail () {
    const systemId: Types.ObjectId = this.configService.get<Types.ObjectId>('config.mongo.systemId')

    const dateStart = DateTime.now()
    const dateEnd = DateTime.now().plus({ minutes: 1 })

    const customers: CustomerEntity[] = await this.customerService.get({ remindDate: { $gte: dateStart.toJSDate(), $lte: dateEnd.toJSDate() } })

    if (customers.length === 0) {
      return
    }
    const processIds: Types.ObjectId[] = customers.map(customer => customer.processId)
    const userIds: Types.ObjectId[] = customers.map(customer => customer.createdBy)

    if (processIds.length === 0) {
      return
    }

    const processList: ProcessEntity[] = await this.processService.getByIds(processIds)
    const users: UserEntity[] = await this.userService.getByIds(userIds)
    const updateCustomerPromises: Promise<CustomerEntity>[] = [] // TODO: bad practice here, recommended check if email has been sended.
    const emailSendPromises: Promise<any>[] = []
    customers.forEach((customer: CustomerEntity) => {
      const process: ProcessEntity = processList.find(element => String(element.id) === String(customer.processId))
      const user: UserEntity = users.find(element => String(element.id) === String(customer.createdBy))

      const message: string = 'Tienes un recordatorio para el negocio ' + customer.customerName + ' actualmente en Lead de ' + process.name + '. '
      const userName: string = (user.firstName ? user.firstName : ' ') + (user.lastName ? ' ' + user.lastName : ' ')
      const subject: string = 'Recordatorio de LEAD'
      emailSendPromises.push(this.emailService.send(user.email, subject, 'customerRemind.pug', { message, userName, subject }))
      // async send (emailTo: string, emailFrom: string, subject: string, templateName: string, context: any): Promise<any> {

      /*
      userName
      message
      */
      // send email
      updateCustomerPromises.push(this.customerService.update(customer.id, { remindDate: null, modifiedBy: systemId, modifiedAt: new Date() }))
    })
    await Promise.all([...emailSendPromises, ...updateCustomerPromises])
  }

  @Cron('*/10 * * * * *')
  async handleCronEveryMinuteSync () {
    await this.blProjectedDataService.syncAll()
  }
}
