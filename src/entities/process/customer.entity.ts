import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'curstomers'
})
export class CustomerEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    processId!: Types.ObjectId

  @Field()
  @Prop({ required: true })
    commercialValue!: number

  @Field()
  @Prop({ required: true })
    attemptClosingDate!: Date

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @Field()
  @Prop({ required: true })
    customerName!: string

  @Field({ nullable: true })
  @Prop()
    catalogPriority?: number

  @Field({ nullable: true })
  @Prop()
    attachedQuotePath?: string

  @Field({ nullable: true })
  @Prop()
    comments?: string

  @Field({ nullable: true })
  @Prop({ type: PersonSchema })
    contact?: PersonEntity
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity)
