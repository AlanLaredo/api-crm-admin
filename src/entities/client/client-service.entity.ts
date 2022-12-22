import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'client_services'
})
export class ClientServiceEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    name!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    serviceType?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    scheduleHours?: string

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    serviceCost?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    elementCost?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    patrolCost?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    quadBikeCost?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    bossShiftCost?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    qrCost?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    costHolyDays?: number

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    addressExecution?: string

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  @Prop()
    totalElementsDay?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  @Prop()
    totalElementsNight?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  @Prop()
    totalPatrol?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  @Prop()
    totalQuadBike?: number

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  @Prop()
    startDate?: Date

  @IsOptional()
  @Field(() => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema })
    emergencyContact?: PersonEntity

  @IsOptional()
  @Field(() => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema, nullable: true })
    paymentContact?: PersonEntity

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    creditDays?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    paymentDays?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    folioCounterReceipt?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    billing?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    branchBank?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    lastFourDigits?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    paymentMethod?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    usageCfdi?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    paymentForm?: string
}

export const ClientServiceSchema = SchemaFactory.createForClass(ClientServiceEntity)
