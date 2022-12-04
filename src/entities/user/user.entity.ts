import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'users'
})
export class UserEntity extends IdentityLogEntity {
  @Field(type => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true, unique: true })
    username!: string

  @Exclude()
  @Prop({ required: true })
    password?: string

  @Field()
  @Prop({ required: true, unique: true })
    email!: string

  @Field()
  @Prop({ required: true })
    firstName!: string

  @Field({ nullable: true })
  @Prop()
    lastName?: string

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, nullable: true })
    roleAccessId?: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
