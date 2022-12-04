import { InputType, Field, ID } from '@nestjs/graphql'
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
    username!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    password?: string

  @IsEmail()
  @Field()
    email!: string

  @IsNotEmpty()
  @IsString()
  @Field()
    firstName!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    lastName?: string

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
    roleAccessId?: Types.ObjectId
}
