import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'recruits'
})
export class RecruitEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ type: PersonSchema, required: true })
    data!: PersonEntity

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    jobVacancyId!: Types.ObjectId

  @Field()
  @Prop({ required: true })
    interviewerName!: string

  @Field(type => [String], { nullable: true })
  @Prop({ type: [String] })
    requiredDocumentsPaths?: string[]

  @Field({ nullable: true })
  @Prop()
    requiredInfo?: string

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    statusApplicantId!: Types.ObjectId
}

export const RecruitSchema = SchemaFactory.createForClass(RecruitEntity)
