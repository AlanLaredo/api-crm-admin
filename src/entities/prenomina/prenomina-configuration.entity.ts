import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'
import { ClientEntity } from '../client'

import { IdentityLogEntity } from '../common'
import { PrenominaPeriodEntity } from './prenomina-period.entity'

@ArgsType()
@InputType('PrenominaConfigurationInput')
@ObjectType()
@Schema({
  collection: 'prenomina_configurations'
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

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId?: Types.ObjectId

  @Field(() => [PrenominaPeriodEntity], { nullable: true })
    prenominaPeriods?: PrenominaPeriodEntity[]

  @Field(() => [ClientEntity], { nullable: true })
    clients?: ClientEntity[]
}

export const PrenominaConfigurationSchema = SchemaFactory.createForClass(PrenominaConfigurationEntity)
