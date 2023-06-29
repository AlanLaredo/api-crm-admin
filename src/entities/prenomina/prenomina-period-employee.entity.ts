import { Field, ID, ObjectType, ArgsType, InputType, Float } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { EmployeeEntity } from '../employee'
import { PrenominaPeriodEmployeeDayEntity } from './prenomina-period-employee-day.entity'

@ArgsType()
@InputType('PrenominaPeriodEmployeeInput')
@ObjectType()
@Schema({
  collection: 'prenomina_period_employees'
})
export class PrenominaPeriodEmployeeEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    employeeId?: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    prenominaPeriodId?: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    keycode?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    bankAccount?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    clientName?: string

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    salary?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    absences?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    saving?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    uniforms?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    advance?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    double?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    bonus?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    holiday?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    infonavit?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    fonacot?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    loan?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    nss?: number

    
  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    loanDeposit?: number
    
  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    differenceWithoutImss?: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    total?: number

  @Field(() => EmployeeEntity, { nullable: true })
    employee?: EmployeeEntity

  @Field(() => [PrenominaPeriodEmployeeDayEntity], { nullable: true })
    prenominaPeriodEmployeeDays?: PrenominaPeriodEmployeeDayEntity[]
}

export const PrenominaPeriodEmployeeSchema = SchemaFactory.createForClass(PrenominaPeriodEmployeeEntity)
