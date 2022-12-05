import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

@ObjectType()
@ArgsType()
@Schema()
export class IdentityLogEntity {
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    createdBy!: Types.ObjectId

  @Field(() => Date, { nullable: true })
  @Prop({ required: true })
    createdAt!: Date

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    modifiedBy?: Types.ObjectId

  @Field(() => Date, { nullable: true })
  @Prop()
    modifiedAt?: Date

  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    deletedBy?: Types.ObjectId

  @Field(() => Date, { nullable: true })
  @Prop()
    deletedAt?: Date
}

export default Object.getOwnPropertyNames(new IdentityLogEntity()) as (keyof IdentityLogEntity)[]
