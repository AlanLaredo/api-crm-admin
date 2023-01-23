import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('PrenominaInput')
@Schema({
  collection: 'prenominas'
})
export class PrenominaEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: false })
  @Prop()
    name!: string

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    clientIds?: Types.ObjectId[]

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ nullable: true })
    billing?: string
}

export const PrenominaSchema = SchemaFactory.createForClass(PrenominaEntity)
