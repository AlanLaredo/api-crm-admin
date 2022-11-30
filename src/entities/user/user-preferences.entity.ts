import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'user_preferences'
})
export class UserPreferencesEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Field()
  @Prop()
    theme?: string

  @Field()
  @Prop()
    menuMode?: string
}

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferencesEntity)
