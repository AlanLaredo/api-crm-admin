import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('UserRoleInput')
@Schema({
  collection: 'user_roles'
})
export class UserRoleEntity extends IdentityLogEntity {
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

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    permissionsIds?: Types.ObjectId[]
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleEntity)
