import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { CompanyEntity } from '../company'
import { CustomerEntity } from './customer.entity'
import { ProcessFunctionEntity } from './process-function.entity'
@ArgsType()
@InputType('ProcessInput')
@ObjectType()
@Schema({
  collection: 'processes'
})
export class ProcessEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsInt()
  @Field()
  @Prop({ default: 0 })
    order!: number

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    functionsIds?: Types.ObjectId[]

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @Field(() => CompanyEntity, { nullable: true })
    company?: any

  @Field(() => [ProcessFunctionEntity], { nullable: true })
    functions?: any

  @Field(() => [CustomerEntity], { nullable: true })
    customers?: any
}

export const ProcessSchema = SchemaFactory.createForClass(ProcessEntity)
