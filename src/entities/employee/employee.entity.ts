import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'
import { ClientEntity } from '../client'

import { AddressEntity, AddressSchema, IdentityLogEntity, PersonEntity, PersonSchema } from '../common'
import { CompanyEntity } from '../company'
import { OperationEntity } from './operation.entity'

@ObjectType()
@ArgsType()
@InputType('EmployeeInput')
@Schema({
  collection: 'employees'
})
export class EmployeeEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    keycode?: string

  @IsNotEmpty()
  @Field(() => PersonEntity)
  @Prop({ type: PersonSchema, required: true })
    person!: PersonEntity

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    positionId?: Types.ObjectId

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Prop()
    hiringDate?: Date

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Prop()
    startOperationDate?: Date

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @IsOptional()
  @Field(() => AddressEntity, { nullable: true })
  @Prop({ type: AddressSchema })
    address?: AddressEntity

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    attachedQuotePath?: string[]

  @Field(() => [OperationEntity], { nullable: true })
    operations?: OperationEntity[]

  @Field(() => CompanyEntity, { nullable: true })
    company?: CompanyEntity

  @Field(() => ClientEntity, { nullable: true })
    client?: ClientEntity
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeEntity)
