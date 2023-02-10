import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { PrenominaPeriodEntity } from './prenomina-period.entity'

@ArgsType()
@InputType('PrenominaConfigurationInput')
@ObjectType()
@Schema({
  collection: 'prenominaConfigurations'
})
export class PrenominaConfigurationEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    clientsIds?: Types.ObjectId[]

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    billingPeriod!: string

  @Field(() => [PrenominaPeriodEntity], { nullable: true })
    prenominaPeriods?: PrenominaPeriodEntity[]
}

export const PrenominaConfigurationSchema = SchemaFactory.createForClass(PrenominaConfigurationEntity)
