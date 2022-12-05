import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsOptional, IsString } from 'class-validator'

@ObjectType()
@Schema()
export class AddressEntity {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    name?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    street?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    exteriorNumber?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    interiorNumber?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    neightborhood?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    city?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    state?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    country?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    postalCode?: string
}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity)
