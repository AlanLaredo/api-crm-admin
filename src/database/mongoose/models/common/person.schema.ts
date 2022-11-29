import { Prop, Schema } from '@nestjs/mongoose'

import { AddressSchema } from './address.schema'

@Schema()
export abstract class PersonSchema {
  @Prop({ required: true })
    name!: string

  @Prop()
    lastName?: string

  @Prop({ type: [String] })
    phoneContacts?: string[]

  @Prop({ type: [String] })
    emails?: string[]

  @Prop()
    comments?: string

  @Prop({ type: AddressSchema })
    address?: AddressSchema
}
