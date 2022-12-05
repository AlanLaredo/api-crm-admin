import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()@Schema({
  collection: 'processes'
})
export class ProcessEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsInt()
  @Field()
  @Prop()
    order!: number

  @IsOptional()
  @IsArray()
  @Field(() => [mongoose.Schema.Types.ObjectId], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
    functionsIds?: Types.ObjectId[]

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId
}

export const ProcessSchema = SchemaFactory.createForClass(ProcessEntity)
