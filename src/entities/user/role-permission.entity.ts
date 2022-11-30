import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'role_permissions'
})
export class RolePermissionEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop()
    description?: string

  @Field()
  @Prop()
    tag!: string
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermissionEntity)
