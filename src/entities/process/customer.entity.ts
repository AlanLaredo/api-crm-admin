import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'
import { ClientEntity } from '../client'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'
import { ProcessEntity } from './process.entity'

@ArgsType()
@InputType('CustomerInput')
@ObjectType()
@Schema({
  collection: 'curstomers'
})
export class CustomerEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    processId!: Types.ObjectId

  @IsNumber()
  @Field()
  @Prop({ required: true })
    commercialValue!: number

  @IsDate()
  @Field()
  @Prop({ required: true })
    attemptClosingDate!: Date

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId?: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientServiceId?: Types.ObjectId

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  @Prop()
    hidden?: boolean

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    customerName!: string

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  @Prop()
    catalogPriority?: number

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    attachedQuotePath?: string[]

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    comments?: string

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Prop()
    remindDate?: Date

  @IsOptional()
  @Field(() => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema })
    contact?: PersonEntity

  @Field(() => ClientEntity, { nullable: true })
    client?: ClientEntity

  @Field(() => ProcessEntity, { nullable: true })
    process?: ProcessEntity

  @Field(() => [String], { nullable: true })
    emails?: string[]
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity)
