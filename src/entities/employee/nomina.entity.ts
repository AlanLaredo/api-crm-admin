import { Field, ID, ObjectType, ArgsType, InputType, Float } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('NominaInput')
@Schema({
  collection: 'nominas'
})
export class NominaEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    prenominaId!: Types.ObjectId

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    employeeId!: Types.ObjectId

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

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientId!: Types.ObjectId

  @IsMongoId()
  @Field(() => ID, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientServiceId!: Types.ObjectId

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    salary: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    absences: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    saving: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    uniforms: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    advance: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    double: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    bonus: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    holiday: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    infonavit: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    fonacot: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    loan: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    nss: number

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    total: number

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    operationsIds?: Types.ObjectId[]
}

export const NominaSchema = SchemaFactory.createForClass(NominaEntity)
