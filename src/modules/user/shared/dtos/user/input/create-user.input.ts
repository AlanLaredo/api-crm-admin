import { InputType, Field, ID } from '@nestjs/graphql'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
    username!: string

  @IsOptional()
  @IsString()
  @Field()
    password?: string

  @IsNotEmpty()
  @IsString()
  @Field()
    email!: string

  @IsNotEmpty()
  @IsString()
  @Field()
    firstName!: string

  @IsOptional()
  @IsString()
  @Field()
    lastName?: string

  @IsOptional()
  @IsMongoId()
  @Field(() => ID)
    roleAccessId?: Types.ObjectId
}
