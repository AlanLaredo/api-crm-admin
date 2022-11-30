import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'process_functions'
})
export class ProcessFunctionEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ required: true })
    name!: string

  @Field()
  @Prop()
    description?: string

  @Field()
  @Prop({ required: true })
    key!: string
}

export const ProcessFunctionSchema = SchemaFactory.createForClass(ProcessFunctionEntity)
