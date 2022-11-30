import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'positions'
})
export class PositionEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Field()
  @Prop()
    salary?: number
}

export const PositionSchema = SchemaFactory.createForClass(PositionEntity)
