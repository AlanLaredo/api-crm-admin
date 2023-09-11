import { Field, ID, ObjectType, ArgsType, InputType, Float } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ArgsType()
@InputType('PrenominaPeriodEmployeeDayInput')
@ObjectType()
@Schema({
  collection: 'prenomina_period_employee_days'
})
export class PrenominaPeriodEmployeeDayEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    prenominaPeriodEmployeeId!: Types.ObjectId

  @IsDate()
  @Field({ nullable: false })
  @Prop()
    date!: Date

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    operationText?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    operationAbbreviation?: string

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operationComments?: string

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operationConfirmComments?: string

  @IsOptional()
  @IsNumber()
  @Prop()
  @Field(() => Float, { nullable: true })
    operationHours?: number

  @IsOptional()
  @IsNumber()
  @Prop()
  @Field(() => Float, { nullable: true })
    operationConfirmHours?: number
  
    
}

export const PrenominaPeriodEmployeeDaySchema = SchemaFactory.createForClass(PrenominaPeriodEmployeeDayEntity)
