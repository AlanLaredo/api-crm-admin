import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { AddressSchema, IdentityLogSchema, PersonSchema } from '../common'

@Schema({
  collection: 'clients'
})
export class Client extends IdentityLogSchema {
  id?: Types.ObjectId

  @Prop()
    keycode?: string

  @Prop()
    rfc?: string

  @Prop({ required: true })
    businessName!: string

  @Prop()
    businessReason?: string

  @Prop({ type: PersonSchema })
    legalRepresentativeContact?: PersonSchema

  @Prop({ type: AddressSchema })
    fiscalAddress?: AddressSchema

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId
}

export const ClientSchema = SchemaFactory.createForClass(Client)

export const ClientModel: ModelDefinition = {
  name: Client.name,
  schema: ClientSchema
}
