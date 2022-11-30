import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { AddressEntity, IdentityLogEntity, PersonEntity } from '../common'

@Schema({
  collection: 'clients'
})
export class ClientEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop()
    keycode?: string

  @Prop()
    rfc?: string

  @Prop({ required: true })
    businessName!: string

  @Prop()
    businessReason?: string

  @Prop({ type: PersonEntity })
    legalRepresentativeContact?: PersonEntity

  @Prop({ type: AddressEntity })
    fiscalAddress?: AddressEntity

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId
}

export const ClientSchema = SchemaFactory.createForClass(ClientEntity)
