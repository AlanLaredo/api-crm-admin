import { Field, ID, ObjectType, ArgsType, InputType, Float } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@ArgsType()
@InputType('ProductManagementInput')
@Schema({
  collection: 'productManagements'
})
export class ProductManagementEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: false })
  @Prop()
    keycode!: string

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: false })
  @Prop()
    name!: string

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: false })
  @Prop()
    description!: string

  @IsNotEmpty()
  @IsInt()
  @Field()
  @Prop({ default: 0 })
    reorderPoint!: number

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  @Prop()
    unitCost!: number

  @IsOptional()
  @IsInt()
  @Field({ nullable: true })
  @Prop({ default: 0 })
    itemsInStock?: number
}

export const ProductManagementSchema = SchemaFactory.createForClass(ProductManagementEntity)
