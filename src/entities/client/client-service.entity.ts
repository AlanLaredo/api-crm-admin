import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'client_services'
})
export class ClientServiceEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    cientId!: Types.ObjectId

  @Field({ nullable: true })
  @Prop()
    serviceType?: string

  @Field({ nullable: true })
  @Prop()
    scheduleHours?: string

  @Field(type => Float, { nullable: true })
  @Prop()
    serviceCost?: number

  @Field(type => Float, { nullable: true })
  @Prop()
    elementCost?: number

  @Field(type => Float, { nullable: true })
  @Prop()
    patrolCost?: number

  @Field(type => Float, { nullable: true })
  @Prop()
    quadBikeCost?: number

  @Field(type => Float, { nullable: true })
  @Prop()
    bossShiftCost?: number

  @Field(type => Float, { nullable: true })
  @Prop()
    qrCost?: number

  @Field(type => Float, { nullable: true })
  @Prop()
    costHolyDays?: number

  @Field({ nullable: true })
  @Prop()
    addressExecution?: string

  @Field(type => Int, { nullable: true })
  @Prop()
    totalElementsDay?: number

  @Field(type => Int, { nullable: true })
  @Prop()
    totalElementsNight?: number

  @Field(type => Int, { nullable: true })
  @Prop()
    totalPatrol?: number

  @Field(type => Int, { nullable: true })
  @Prop()
    totalQaudBike?: number

  @Field(type => Date, { nullable: true })
  @Prop()
    startDate?: Date

  @Field(type => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema })
    emergencyContact?: PersonEntity

  @Prop({ type: PersonSchema, nullable: true })
    paymentContact?: PersonEntity

  @Prop({ nullable: true })
    creditDays?: string

  @Prop({ nullable: true })
    paymentDays?: string

  @Prop({ nullable: true })
    folioCounterReceipt?: string

  @Prop({ nullable: true })
    billing?: string

  @Prop({ nullable: true })
    branchBank?: string

  @Prop({ nullable: true })
    lastFourDigits?: string

  @Prop({ nullable: true })
    paymentMethod?: string

  @Prop({ nullable: true })
    usageCfdi?: string

  @Prop({ nullable: true })
    paymentForm?: string
}

export const ClientServiceSchema = SchemaFactory.createForClass(ClientServiceEntity)
