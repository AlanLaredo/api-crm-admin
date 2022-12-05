import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'curstomers'
})
export class CustomerEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    processId!: Types.ObjectId

  @IsNumber()
  @Field()
  @Prop({ required: true })
    commercialValue!: number

  @IsDate()
  @Field()
  @Prop({ required: true })
    attemptClosingDate!: Date

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientId!: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    customerName!: string

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  @Prop()
    catalogPriority?: number

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    attachedQuotePath?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    comments?: string

  @IsOptional()
  @Field(() => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema })
    contact?: PersonEntity
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity)
