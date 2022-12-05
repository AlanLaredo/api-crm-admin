import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { AddressEntity, AddressSchema } from './address.entity'

@ObjectType()
@InputType('CreatePersonInput')
@Schema()
export class PersonEntity {
  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    lastName?: string

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    phoneContacts?: string[]

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
    emails?: string[]

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    comments?: string

  @IsOptional()
  @Field(() => AddressEntity, { nullable: true })
  @Prop({ type: AddressSchema })
    address?: AddressEntity
}

export const PersonSchema = SchemaFactory.createForClass(PersonEntity)
