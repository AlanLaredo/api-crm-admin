import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { AddressEntity, AddressSchema } from './address.entity'

@ObjectType()
@Schema()
export class PersonEntity {
  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop()
    lastName?: string

  @Field(type => [String])
  @Prop({ type: [String] })
    phoneContacts?: string[]

  @Field(type => [String])
  @Prop({ type: [String] })
    emails?: string[]

  @Field()
  @Prop()
    comments?: string

  @Field(type => AddressEntity)
  @Prop({ type: AddressSchema })
    address?: AddressEntity
}

export const PersonSchema = SchemaFactory.createForClass(PersonEntity)
