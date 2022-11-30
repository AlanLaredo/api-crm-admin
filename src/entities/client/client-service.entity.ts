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

  @Field(type => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    cientId!: Types.ObjectId

  @Field()
  @Prop()
    serviceType?: string

  @Field()
  @Prop()
    scheduleHours?: string

  @Field(type => Float)
  @Prop()
    serviceCost?: number

  @Field(type => Float)
  @Prop()
    elementCost?: number

  @Field(type => Float)
  @Prop()
    patrolCost?: number

  @Field(type => Float)
  @Prop()
    quadBikeCost?: number

  @Field(type => Float)
  @Prop()
    bossShiftCost?: number

  @Field(type => Float)
  @Prop()
    qrCost?: number

  @Field(type => Float)
  @Prop()
    costHolyDays?: number

  @Field()
  @Prop()
    addressExecution?: string

  @Field(type => Int)
  @Prop()
    totalElementsDay?: number

  @Field(type => Int)
  @Prop()
    totalElementsNight?: number

  @Field(type => Int)
  @Prop()
    totalPatrol?: number

  @Field(type => Int)
  @Prop()
    totalQaudBike?: number

  @Field(type => Date)
  @Prop()
    startDate?: Date

  @Field(type => PersonEntity)
  @Prop({ type: PersonSchema })
    emergencyContact?: PersonEntity

  @Prop({ type: PersonSchema })
    paymentContact?: PersonEntity

  @Prop()
    creditDays?: string

  @Prop()
    paymentDays?: string

  @Prop()
    folioCounterReceipt?: string

  @Prop()
    billing?: string

  @Prop()
    branchBank?: string

  @Prop()
    lastFourDigits?: string

  @Prop()
    paymentMethod?: string

  @Prop()
    usageCfdi?: string

  @Prop()
    paymentForm?: string
}

export const ClientServiceSchema = SchemaFactory.createForClass(ClientServiceEntity)
