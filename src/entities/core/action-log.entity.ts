import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'action_logs'
})
export class ActionLogEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ type: String })
    file?: string

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ type: String, required: true })
    action!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ type: String })
    description?: string
}

export const ActionLogSchema = SchemaFactory.createForClass(ActionLogEntity)
