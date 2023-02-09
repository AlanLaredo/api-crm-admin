import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { EmployeeEntity } from '../employee'

@ArgsType()
@InputType('PrenominaPeriodInput')
@ObjectType()
@Schema({
  collection: 'prenominaPeriods'
})
export class PrenominaPeriodEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string // Client Name and real dates period

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    prenominaConfigurationId?: Types.ObjectId

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
    completed?: boolean

  @Field(() => [EmployeeEntity], { nullable: true })
    employees?: any[]
}

export const PrenominaPeriodSchema = SchemaFactory.createForClass(PrenominaPeriodEntity)
