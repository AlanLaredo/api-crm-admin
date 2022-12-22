/* eslint-disable no-useless-constructor */
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron } from '@nestjs/schedule'
import { DateTime } from 'luxon'

import { CustomerService } from 'src/database/mongoose/services/process'
import { CustomerEntity } from 'src/entities/process'
@Injectable()
export class AlertTaskService {
  private readonly logger = new Logger(AlertTaskService.name)

  constructor (private configService: ConfigService,
    private customerService: CustomerService) { }

  @Cron('*/20 * * * * *')
  async handleCronEveryMinute () {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')

    const dateStart = DateTime.now()
    const dateEnd = DateTime.now().plus({ minutes: 1 })
    const customers: CustomerEntity[] = await this.customerService.get({ remindDate: { $gte: dateStart.toJSDate(), $lte: dateEnd.toJSDate() } })
    const updatePromises: Promise<CustomerEntity>[] = []
    customers.forEach((customer: CustomerEntity) => {
      updatePromises.push(this.customerService.update(customer.id, { remindDate: null }))
    })

    const updatedCustomers = await Promise.all(updatePromises)

    console.log(' updatedCustomers => ')
    console.log(updatedCustomers)
  }
}
