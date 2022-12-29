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
    const functions = await this.processFunctionService.get({
      $or: [
        { key: 'send-email' },
        { key: 'register-client-from-customer-to-client' },
        { key: 'quote-required' }
      ]
    })
    const functionsPromises = []
    if (!functions.find(f => f.key === 'send-email')) {
      functionsPromises.push(this.createProcessFunction({
        name: 'Enviar email',
        description: 'Enviar email a lista libre de email',
        key: 'send-email'
      }))
    }

    if (!functions.find(f => f.key === 'quote-required')) {
      functionsPromises.push(this.createProcessFunction({
        name: 'Exigir cotización',
        description: 'Exije un cotización',
        key: 'quote-required'
      }))
    }

    if (!functions.find(f => f.key === 'register-client-from-customer-to-client')) {
      functionsPromises.push(this.createProcessFunction({
        name: 'Crear cliente',
        description: 'Crea un cliente a partir de un customer',
        key: 'register-client-from-customer-to-client'
      }))
    }

    if (functionsPromises && functionsPromises.length > 0) {
      await Promise.all(functionsPromises)
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
