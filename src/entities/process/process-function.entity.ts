import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'process_functions'
})
export class ProcessFunctionEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string

  @Prop({ required: true })
    key!: string
}
