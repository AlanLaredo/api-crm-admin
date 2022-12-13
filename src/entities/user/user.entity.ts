import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'
import { UserRoleEntity } from './user-role.entity'

@ArgsType()
@ObjectType()
@InputType('UserInput')
@Schema({
  collection: 'users'
})
export class UserEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true, unique: true })
    username!: string

  @Exclude()
  @Prop({ required: true })
    password?: string

  @IsEmail()
  @Field()
  @Prop({ required: true, unique: true })
    email!: string

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    firstName!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    lastName?: string

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, nullable: true })
    roleAccessId?: Types.ObjectId

  @Field(() => UserRoleEntity, { nullable: true })
    roleAccess?: UserRoleEntity

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, nullable: true })
    companyId?: Types.ObjectId

  isAdmin?: boolean
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
