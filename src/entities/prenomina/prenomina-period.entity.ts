import { Field, ID, ObjectType, ArgsType, InputType, Int } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { OperationEntity } from '../employee'
import { PrenominaPeriodEmployeeEntity } from './prenomina-period-employee.entity'
import { PrenomionaPeriodVacanciesConfigurationEntity } from './prenomina-period-vacancies-configuration.entity'

@ArgsType()
@InputType('PrenominaPeriodInput')
@ObjectType()
@Schema({
  collection: 'prenomina_periods'
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
  @IsDate()
  @Field(() => Date, { nullable: true })
  @Prop()
    date?: Date

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

  @IsOptional()
  @IsArray()
  @Field(() => [PrenomionaPeriodVacanciesConfigurationEntity], { nullable: true })
  @Prop()
    totalVacancies?: PrenomionaPeriodVacanciesConfigurationEntity[]

  @IsOptional()
  @IsArray()
  @Field(() => [OperationEntity], { nullable: true })
  @Prop()
    operations?: OperationEntity[]

  @Field(() => [PrenominaPeriodEmployeeEntity], { nullable: true })
    prenominaPeriodEmployees?: PrenominaPeriodEmployeeEntity[]
}

export const PrenominaPeriodSchema = SchemaFactory.createForClass(PrenominaPeriodEntity)
