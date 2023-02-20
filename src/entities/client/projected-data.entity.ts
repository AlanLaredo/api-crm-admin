

import { Field, Float, ID, Int, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'
import { ClientEntity } from './client.entity'

@ObjectType()
@ArgsType()
@InputType('ProjectedDataInput')
@Schema({
  collection: 'projected_data'
})
export class ProjectedDataEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    clientName!: string // (razón social de cliente + nombre de servicio)

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    clientKeycode!: string

  @IsDate()
  @Prop()
  @Field({ nullable: false })
    startDate!: Date // inicio del periodo

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientServiceId!: Types.ObjectId

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    serviceCost?: number

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    description!: string

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    invoiceName!: string

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    invoiceTotal!: number

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    invoiceTypePayment!: string
}

export const ProjectedDataSchema = SchemaFactory.createForClass(ProjectedDataEntity)
