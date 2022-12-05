import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'user_sessions'
})
export class UserSessionEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    userId!: Types.ObjectId

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  @Prop({ default: false })
    changePassword?: boolean

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true, default: 'web-crm-admin' })
    platformKey!: string

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    token!: string
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSessionEntity)
