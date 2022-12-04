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

  @Field({ nullable: true })
  @Prop()
    keycode?: string

  @Field(type => PersonEntity)
  @Prop({ type: PersonSchema, required: true })
    person!: PersonEntity

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    positionId?: Types.ObjectId

  @Field({ nullable: true })
  @Prop()
    hiringDate?: Date

  @Field({ nullable: true })
  @Prop()
    startOperationDate?: Date

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId?: Types.ObjectId

  @Field(type => AddressEntity, { nullable: true })
  @Prop({ type: AddressSchema })
    address?: AddressEntity
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeEntity)
