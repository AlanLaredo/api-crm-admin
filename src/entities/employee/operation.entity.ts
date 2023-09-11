import { Field, ID, InputType, ObjectType, ArgsType, Float } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { EmployeeEntity } from './employee.entity'

@ObjectType()
@ArgsType()
@InputType('OperationInput')
@Schema({
  collection: 'operations'
})
export class OperationEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsDate()
  @Prop()
  @Field({ nullable: true })
    date!: Date

  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID, { nullable: false })
    employeeId!: Types.ObjectId

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operation?: string

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operationConfirm?: string

  @IsOptional()
  @IsDate()
  @Prop()
  @Field({ nullable: true })
    restDay?: Date

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    workshift?: string

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    hours?: string

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operationComments?: string

  @IsOptional()
  @IsNumber()
  @Prop()
  @Field(() => Float, { nullable: true })
    operationHours?: number

  @IsOptional()
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operationConfirmComments?: string

  @IsOptional()
  @IsNumber()
  @Prop()
  @Field(() => Float, { nullable: true })
    operationConfirmHours?: number

  @IsOptional()
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID, { nullable: true })
    operationModifiedBy?: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID, { nullable: true })
    operationConfirmModifiedBy?: Types.ObjectId

  @Field(() => EmployeeEntity, { nullable: true })
    employee?: EmployeeEntity
}

export const OperationSchema = SchemaFactory.createForClass(OperationEntity)
