import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ArgsType()
@ObjectType()
@InputType('CompanyGroupInput')
@Schema({
  collection: 'company_groups'
})
export class CompanyGroupEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    name!: string
}

export const CompanyGroupSchema = SchemaFactory.createForClass(CompanyGroupEntity)
