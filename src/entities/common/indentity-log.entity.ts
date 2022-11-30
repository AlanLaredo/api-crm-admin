import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

@ObjectType()
@Schema()
export abstract class IdentityLogEntity {
  @Field(type => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    createdBy!: Types.ObjectId

  @Field(type => Date)
  @Prop({ required: true })
    createdAt!: Date

  @Field(type => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    modifiedBy?: Types.ObjectId

  @Field(type => Date)
  @Prop()
    modifiedAt?: Date

  @Field(type => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    deletedBy?: Types.ObjectId

  @Field(type => Date)
  @Prop()
    deletedAt?: Date
}
