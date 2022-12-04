import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'action_logs'
})
export class ActionLogEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field(() => ID)
  @Prop({ types: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @Field({ nullable: true })
  @Prop({ type: String })
    file?: string

  @Field()
  @Prop({ type: String, required: true })
    action!: string

  @Field({ nullable: true })
  @Prop({ type: String })
    description?: string
}

export const ActionLogSchema = SchemaFactory.createForClass(ActionLogEntity)
