import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

import { AddressEntity, AddressSchema, IdentityLogEntity, PersonEntity, PersonSchema } from '../common'

@ObjectType()
@Schema({
  collection: 'clients'
})
export class ClientEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field({ nullable: true })
  @Prop()
    keycode?: string

  @Field({ nullable: true })
  @Prop()
    rfc?: string

  @Field()
  @Prop({ required: true })
    businessName!: string

  @Field({ nullable: true })
  @Prop()
    businessReason?: string

  @Field(type => PersonEntity, { nullable: true })
  @Prop({ type: PersonSchema })
    legalRepresentativeContact?: PersonEntity

  @Field(type => AddressEntity, { nullable: true })
  @Prop({ type: AddressSchema })
    fiscalAddress?: AddressEntity

  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId
}

export const ClientSchema = SchemaFactory.createForClass(ClientEntity)
