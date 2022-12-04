import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'applicant_status'
})
export class ApplicantStatusEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field({ nullable: true })
  @Prop()
    description?: string
}

export const ApplicantStatusSchema = SchemaFactory.createForClass(ApplicantStatusEntity)
