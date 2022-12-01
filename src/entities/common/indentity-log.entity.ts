import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

@ObjectType()
@Schema()
export abstract class IdentityLogEntity {
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    createdBy!: Types.ObjectId

  @Field(type => Date)
  @Prop({ required: true })
    createdAt!: Date

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    modifiedBy?: Types.ObjectId

  @Field(type => Date, { nullable: true })
  @Prop()
    modifiedAt?: Date

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    deletedBy?: Types.ObjectId

  @Field(type => Date, { nullable: true })
  @Prop()
    deletedAt?: Date
}
