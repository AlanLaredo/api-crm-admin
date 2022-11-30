import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'users'
})
export class UserEntity extends IdentityLogEntity {
  @Field(type => {
    console.log('data type')
    console.log(type)
    return ID
  })
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true, unique: true })
    username!: string

  @Field()
  @Prop({ required: true })
    password?: string

  @Field()
  @Prop({ required: true, unique: true })
    email!: string

  @Field()
  @Prop({ required: true })
    firstName!: string

  @Field()
  @Prop()
    lastName?: string

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    roleAccessId?: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
