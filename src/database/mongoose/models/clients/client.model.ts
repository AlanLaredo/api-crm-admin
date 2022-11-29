import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogSchema } from '../common'

@Schema({
  collection: 'clients'
})
export class ClientModel extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop({ type: String })
    xProp: string
}

export const ClientSchema = SchemaFactory.createForClass(ClientModel)
