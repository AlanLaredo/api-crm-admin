import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'companies'
})
export class CompanyEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    name!: Types.ObjectId

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyGroupId?: Types.ObjectId

  @Field({ nullable: true })
  @Prop()
    logoImagePath?: string

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyId?: Types.ObjectId
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity)
