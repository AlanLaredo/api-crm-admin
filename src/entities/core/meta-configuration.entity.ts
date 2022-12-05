import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'meta_configuration'
})
export class MetaConfigurationEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ type: String, required: true })
    key!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ type: String, required: false, default: null })
    value?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop({ type: String })
    description?: string

  @IsBoolean()
  @Field()
  @Prop({ type: Boolean, required: true, default: true })
    active!: boolean
}

export const MetaConfigurationSchema = SchemaFactory.createForClass(MetaConfigurationEntity)
