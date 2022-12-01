import { InputType, Field, ID } from '@nestjs/graphql'
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

@InputType()
export class UpdateSupplierInput {
  @IsMongoId()
  @Field(() => ID)
    id!: Types.ObjectId

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
    name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
    rfc?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
    phone?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
    description?: string

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
    active?: boolean
}
