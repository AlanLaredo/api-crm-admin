import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator'
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
}

export const PrenominaPeriodEmployeeDaySchema = SchemaFactory.createForClass(PrenominaPeriodEmployeeDayEntity)
