import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'users'
})
export class UserEntity extends IdentityLogEntity {
  @Field(type => ID, { nullable: true })
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
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
