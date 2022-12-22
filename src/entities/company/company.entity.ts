import { Field, ID, InputType, ObjectType, ArgsType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsMongoId, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'
import { ClientEntity } from '../client'

import { IdentityLogEntity } from '../common'
import { ProcessEntity } from '../process'
import { UserEntity } from '../user'
import { CompanyGroupEntity } from './company-group.entity'

@ObjectType()
@ArgsType()
@InputType('CompanyInput')
@Schema({
  collection: 'companies'
})
export class CompanyEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsString()
  @Field(() => String)
  @Prop({ type: String, required: true })
    name!: string

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyGroupId?: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    logoImagePath?: string

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyId?: Types.ObjectId

  @Field(() => CompanyGroupEntity, { nullable: true })
    companyGroup?: CompanyGroupEntity

  @Field(() => CompanyEntity, { nullable: true })
    companyParent?: any

  @Field(() => [UserEntity], { nullable: true })
    users?: UserEntity[]

  @Field(() => CompanyEntity, { nullable: true })
    company?: any

  @Field(() => [ProcessEntity], { nullable: true })
    processList?: any[]

  @Field(() => [ClientEntity], { nullable: true })
    clients?: any[]
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity)
