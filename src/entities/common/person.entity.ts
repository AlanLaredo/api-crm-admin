import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { AddressEntity, AddressSchema } from './address.entity'

@ObjectType()
@Schema()
export class PersonEntity {
  @Field()
  @Prop({ required: true })
    name!: string

  @Field({ nullable: true })
  @Prop()
    lastName?: string

  @Field(type => [String], { nullable: true })
  @Prop({ type: [String] })
    phoneContacts?: string[]

  @Field(type => [String], { nullable: true })
  @Prop({ type: [String] })
    emails?: string[]

  @Field({ nullable: true })
  @Prop()
    comments?: string

  @Field(type => AddressEntity, { nullable: true })
  @Prop({ type: AddressSchema })
    address?: AddressEntity
}

export const PersonSchema = SchemaFactory.createForClass(PersonEntity)
