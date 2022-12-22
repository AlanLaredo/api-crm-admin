import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Types } from 'mongoose'

import { ProcessFunctionService } from 'src/database/mongoose/services/process'
import { ProcessFunctionEntity } from 'src/entities/process'
import { CommonModule } from '../common/common.module'
import { PROCESS_RESOLVERS } from './resolvers'

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    ...PROCESS_RESOLVERS
  ],
  exports: []
})
export class ProcessModule {
  constructor (private processFunctionService: ProcessFunctionService,
    private configService: ConfigService) {
    console.log('Process module sucessfully initialized.')
    this.initialConfiguration()
  }

  async initialConfiguration () {
    const rows = await this.processFunctionService.get()
    if (rows.length === 0) {
      const emailFunction: any = {
        name: 'Enviar email a CrmAdmin',
        description: 'Enviar email a personal con notificación de actualización de proceso',
        key: 'send-email-to-admin'
      }
      const createClientFromCustomer: any = {
        name: 'Crear cliente',
        description: 'Crea un cliente a partir de un customer',
        key: 'register-client-from-customer-to-client'
      }
      Promise.all([this.createProcessFunction(emailFunction), this.createProcessFunction(createClientFromCustomer)])
    }
  }

  async createProcessFunction (data: any) {
    const systemId: string = this.configService.get<string>('config.mongo.systemId')
    const { name, description, key } = data
    const processFunction: ProcessFunctionEntity = {
      name,
      description,
      key,
      createdBy: new Types.ObjectId(systemId),
      createdAt: new Date()
    }
    return this.processFunctionService.create(processFunction)
  }
}
