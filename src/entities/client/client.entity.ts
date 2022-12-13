import { Field, ID, ObjectType, InputType, ArgsType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { AddressEntity, AddressSchema, IdentityLogEntity, PersonEntity, PersonSchema } from '../common'
import { CompanyEntity } from '../company'

@ObjectType()
@ArgsType()
@InputType('ClientInput')
@Schema({
  collection: 'clients'
})
export class ClientEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    keycode?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    rfc?: string

  @IsNotEmpty()
  @IsString()
  @Field()
  @Prop({ required: true })
    businessName!: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    businessReason?: string

  @IsOptional()
  @Field(() => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema })
    legalRepresentativeContact?: PersonEntity

  @IsOptional()
  @Field(() => AddressEntity, { nullable: true })
  @Prop({ type: AddressSchema })
    fiscalAddress?: AddressEntity

  @IsNotEmpty()
  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @Field(() => CompanyEntity, { nullable: true })
    company?: CompanyEntity
}

export const ClientSchema = SchemaFactory.createForClass(ClientEntity)
