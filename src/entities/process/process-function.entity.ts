import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('ProcessFunctionInput')
@Schema({
  collection: 'process_functions'
})
export class ProcessFunctionEntity extends IdentityLogEntity {
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
  @Prop({ required: true })
    key!: string
}

export const ProcessFunctionSchema = SchemaFactory.createForClass(ProcessFunctionEntity)
