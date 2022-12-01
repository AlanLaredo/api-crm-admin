import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()@Schema({
  collection: 'processes'
})
export class ProcessEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop()
    order!: number

  @Field(type => [mongoose.Schema.Types.ObjectId])
  @Prop({ types: [mongoose.Schema.Types.ObjectId] })
    functionsIds?: Types.ObjectId[]

  @Field()
  @Prop()
    companyId!: Types.ObjectId
}

export const ProcessSchema = SchemaFactory.createForClass(ProcessEntity)
