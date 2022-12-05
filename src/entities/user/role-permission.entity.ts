import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'role_permissions'
})
export class RolePermissionEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    description?: string

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop()
    tag!: string
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermissionEntity)
