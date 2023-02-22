
import { Field, Float, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('ProjectedDataInput')
@Schema({
  collection: 'projected_data'
})
export class ProjectedDataEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    projectedPeriodId!: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    clientKeycode!: string

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    clientServiceKeycode!: string

  @IsDate()
  @Prop()
  @Field({ nullable: false })
    startDate!: Date // inicio del periodo

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    clientName!: string // (razón social de cliente + nombre de servicio)

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
  @Field({ nullable: true })
  @Prop()
    description!: string

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    invoiceName?: string

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    invoiceTotal!: number

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    invoiceTypePayment!: string
}

export const ProjectedDataSchema = SchemaFactory.createForClass(ProjectedDataEntity)
