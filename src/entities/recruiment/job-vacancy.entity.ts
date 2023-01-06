import { Field, ID, ObjectType, ArgsType, InputType, Float, Int } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import mongoose, { Types } from 'mongoose'
import { ClientServiceEntity } from '../client'

import { IdentityLogEntity } from '../common'
import { PositionEntity } from './position.entity'
import { RecruitEntity } from './recruit.entity'

@ObjectType()
@ArgsType()
@InputType('JobVacancyInput')
@Schema({
  collection: 'job_vacancies'
})
export class JobVacancyEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientServiceId!: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    positionId!: Types.ObjectId

  @IsNumber()
  @Field()
  @Prop({ required: true })
    totalVacancies!: number

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    requiredDocumentsPaths?: string[]

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { nullable: false })
  @Prop({ required: true })
    jobVacanciesStatus!: number

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @Field(() => ClientServiceEntity, { nullable: true })
    clientService?: ClientServiceEntity

  @Field(() => PositionEntity, { nullable: true })
    position?: PositionEntity

  @Field(() => [RecruitEntity], { nullable: true })
    recruits?: RecruitEntity[]
}

export const JobVacancySchema = SchemaFactory.createForClass(JobVacancyEntity)
