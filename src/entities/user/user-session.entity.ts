import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'user_sessions'
})
export class UserSessionEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Field({ nullable: true })
  @Prop({ default: false })
    changePassword?: boolean

  @Field()
  @Prop({ required: true, default: 'web-crm-admin' })
    platformKey!: string

  @Field()
  @Prop({ required: true })
    token!: string
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSessionEntity)
