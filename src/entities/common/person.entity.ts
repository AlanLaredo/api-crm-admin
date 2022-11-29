import { Prop, Schema } from '@nestjs/mongoose'

import { AddressEntity } from './address.entity'

@Schema()
export abstract class PersonEntity {
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

  @Prop({ type: AddressEntity })
    address?: AddressEntity
}
