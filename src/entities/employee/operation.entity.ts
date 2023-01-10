import { Field, ID, InputType, ObjectType, ArgsType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

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
    employeeId?: Types.ObjectId

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
  @IsString()
  @Prop()
  @Field({ nullable: true })
    operationConfirmComments?: string

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
}

export const OperationSchema = SchemaFactory.createForClass(OperationEntity)
