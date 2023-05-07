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
  private systemId = null
  constructor (private configService: ConfigService,
    private customerService: CustomerService,
    private operationService: OperationService,
    private emailService: EMailService,
    private userService: UserService,
    private processService: ProcessService,
    private blProjectedDataService: BlProjectedDataService) {
    this.systemId = this.configService.get<Types.ObjectId>('config.mongo.systemId')
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
    const dTToday = DateTime.now()

    // Encuentra el primer día de esta semana
    const startOfWeek = dTToday.startOf('week').startOf('day')

    // Encuentra el último día de esta semana
    const endOfWeek = dTToday.endOf('week').endOf('day')

    // Encuentra el primer día de la semana siguiente
    const startOfNextWeek = endOfWeek.plus({ days: 1 }).startOf('day')

    // Encuentra el último día de la semana siguiente
    const endOfNextWeek = startOfNextWeek.endOf('week').endOf('day')

        
  
    const validOperations: OperationEntity[] = await this.operationService.get({
      date: { $gte: startOfWeek.toJSDate(), $lte: endOfNextWeek.toJSDate() }
    })

    // const lastWeekOperations: any[] = []
    // const nextWeekOperations: any[] = []



    // Filtra las fechas de esta semana y la semana siguiente
    const lastWeekOperations = validOperations.filter(operation => {
      const date = DateTime.fromJSDate(operation.date)
      return date >= startOfWeek && date <= endOfWeek
    })

    const nextWeekOperations = validOperations.filter(operation => {
      const date = DateTime.fromJSDate(operation.date)
      return date >= startOfNextWeek && date <= endOfNextWeek
    })

    const saveOperations: OperationEntity[] = []
    lastWeekOperations.forEach(
      (operation: OperationEntity) => {

        const operationDate = DateTime.fromJSDate(operation.date)
        const employeeId = operation.employeeId
        const nextWeekDay = operationDate.plus({ days: 7 })
        if (operation.restDay || operation.workshift || operation.hours) {
          const foundOnNextWeekOperation: any = nextWeekOperations.find(
            nwo => DateTime.fromJSDate(nwo.date).equals(nextWeekDay) && String(nwo.employeeId) === String(employeeId))

          const employeeOperations = nextWeekOperations.filter(lWO => String(lWO.employeeId) === String(operation.employeeId))
          const existsRestDay = employeeOperations.find(eO => eO.restDay)

          let saveOperationObject: Partial<OperationEntity> = {}
          if (foundOnNextWeekOperation) {
            saveOperationObject = foundOnNextWeekOperation as OperationEntity
      
            if (!foundOnNextWeekOperation.restDay && !existsRestDay) {
              if (operation.restDay) {
                saveOperationObject.restDay = nextWeekDay.toJSDate()
              } else {
                saveOperationObject.restDay = null
              }
            }
            if (!foundOnNextWeekOperation.workshift) {
              saveOperationObject.workshift = operation.workshift
            }
            if (!foundOnNextWeekOperation.hours) {
              saveOperationObject.hours = operation.hours
            }

          } else {
            saveOperationObject.date = nextWeekDay.toJSDate()
            saveOperationObject.employeeId = employeeId

            if (operation.restDay && !existsRestDay) {
              saveOperationObject.restDay = nextWeekDay.toJSDate()
            } else {
              saveOperationObject.restDay = null
            }
            saveOperationObject.workshift = operation.workshift
            saveOperationObject.hours = operation.hours
            saveOperationObject.createdAt = new Date()
            saveOperationObject.createdBy = new Types.ObjectId(this.systemId)
          }


          saveOperations.push(saveOperationObject as OperationEntity)
        }
      }
    )

    const allPromises = saveOperations.map(operation => operation.id ? this.operationService.update(operation.id, { ...operation }) : this.operationService.create({ ...operation }))
    return Promise.all(allPromises)
  }
}
