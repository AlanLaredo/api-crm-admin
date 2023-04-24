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
import { OperationService } from 'src/database/mongoose/services/employee'
import { OperationEntity } from 'src/entities/employee'
@Injectable()
export class AlertTaskService {
  private readonly logger = new Logger(AlertTaskService.name)

  constructor (private configService: ConfigService,
    private customerService: CustomerService,
    private operationservice: OperationService,
    private emailService: EMailService,
    private userService: UserService,
    private processService: ProcessService,
    private blProjectedDataService: BlProjectedDataService) {
    this.testRemind()
  }

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

  @Cron('*/10 * * * * *')
  async testRemind () {
    console.log('testRemind')
    const dTToday = (DateTime.now()).startOf('day')
    const dTDateLast: DateTime = dTToday.minus({ days: 7 })
    const dTDateNow: DateTime = dTToday
    const dTDateNext: DateTime = dTToday.plus({ days: 7 })
  
    const validOperations: OperationEntity[] = await this.operationservice.get({ date: { $gte: dTDateLast.toJSDate(), $lte: dTDateNow.toJSDate() } })
    console.log(validOperations)
    console.log(dTDateNow.toJSDate())
    console.log(dTDateNow.toJSDate())



    /*

  date: 2023-04-14T06:00:00.000Z,
  employeeId: new ObjectId("6410e7911e382fafbc8e3b55"),

  workshift: 'Trabajemos con este ',
  hours: '3',
  restDay: null | DateTime


  validate: 
  que no existas cruce entre employee  y fecha
  */

  
  }



  // @Cron('0 0 22 * * 0')
  // async processBinnacleOperationData () {
  //   const dTToday = DateTime.now()
  //   const dTDateStart: DateTime = dTToday
  //   const dTDateEnd: DateTime = dTToday.minus({ days: 7 })

  //   const validOperations: OperationEntity[] = await this.operationservice.get({ date: { $gte: dTDateStart.toJSDate(), $lte: dTDateEnd.toJSDate() } })
  //   console.log(validOperations)

  //   // console.log()
  // }
}
