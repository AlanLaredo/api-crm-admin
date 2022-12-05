import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()@Schema({
  collection: 'job_vacancy_status'
})
export class JobVacancyStatusEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    description?: string
}

export const JobVacancyStatusSchema = SchemaFactory.createForClass(JobVacancyStatusEntity)
