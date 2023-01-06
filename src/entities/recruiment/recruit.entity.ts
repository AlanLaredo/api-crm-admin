import { Field, ID, ObjectType, ArgsType, InputType, Float, Int } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@ArgsType()
@InputType('RecruitInput')
@Schema({
  collection: 'recruits'
})
export class RecruitEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsOptional()
  @Field(() => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema, required: true })
    data: PersonEntity

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    jobVacancyId!: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    interviewerName!: string

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    requiredDocumentsPaths?: string[]

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    requiredInfo?: string

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { nullable: false })
  @Prop({ required: true })
    statusApplicant!: number
}

export const RecruitSchema = SchemaFactory.createForClass(RecruitEntity)
