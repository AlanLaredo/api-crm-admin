import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'
import { ClientEntity } from '../client'

import { IdentityLogEntity } from '../common'

@ArgsType()
@InputType('PositionInput')
@ObjectType()
@Schema({
  collection: 'positions'
})
export class PositionEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  @Prop()
    salary?: number

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    requiredDocumentsPaths?: string[]

  @Field(() => ClientEntity, { nullable: true })
    client?: ClientEntity
}

export const PositionSchema = SchemaFactory.createForClass(PositionEntity)
