
import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsOptional } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('ProjectedPeriodInput')
@Schema({
  collection: 'projected_periods'
})
export class ProjectedPeriodEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsDate()
  @Prop()
  @Field({ nullable: false })
    date!: Date // inicio del periodo

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId
}

export const ProjectedPeriodSchema = SchemaFactory.createForClass(ProjectedPeriodEntity)
