import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { AddressEntity, AddressSchema, IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'employees'
})
export class EmployeeEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop()
    keycode?: string

  @Field(type => PersonEntity)
  @Prop({ type: PersonSchema, required: true })
    person!: PersonEntity

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    positionId?: Types.ObjectId

  @Field()
  @Prop()
    hiringDate?: Date

  @Field()
  @Prop()
    startOperationDate?: Date

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId?: Types.ObjectId

  @Field(type => AddressEntity)
  @Prop({ type: AddressSchema })
    address?: AddressEntity
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeEntity)
