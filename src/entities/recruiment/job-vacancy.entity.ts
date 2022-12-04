import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'job_vacancies'
})
export class JobVacancyEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Field()
  @Prop({ required: true })
    totalVacancies!: number

  @Field(type => [String], { nullable: true })
  @Prop({ type: [String] })
    requiredDocumentsPaths?: string[]

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    jobVacanciesStatusId!: Types.ObjectId
}

export const JobVacancySchema = SchemaFactory.createForClass(JobVacancyEntity)
