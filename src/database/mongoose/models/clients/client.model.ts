import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogModel } from '../common'

@Schema({
  collection: 'clients'
})
export class ClientModel extends IdentityLogModel {
  id?: Types.ObjectId

  @Prop({ type: String })
    xProp: string
}

export const ClientSchema = SchemaFactory.createForClass(ClientModel)
