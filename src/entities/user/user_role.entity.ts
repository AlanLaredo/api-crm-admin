import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'user_roles'
})
export class UserRoleEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop()
    description?: string

  @Field()
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    permissionsIds?: Types.ObjectId[]
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleEntity)
