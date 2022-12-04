import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@ObjectType()
@Schema({
  collection: 'meta_configuration'
})
export class MetaConfigurationEntity extends IdentityLogEntity {
  @Field(() => ID)
    id?: Types.ObjectId

  @Field()
  @Prop({ type: String, required: true })
    key!: string

  @Field({ nullable: true })
  @Prop({ type: String, required: false, default: null })
    value?: string

  @Field({ nullable: true })
  @Prop({ type: String })
    description?: string

  @Field()
  @Prop({ type: Boolean, required: true, default: true })
    active!: boolean
}

export const MetaConfigurationSchema = SchemaFactory.createForClass(MetaConfigurationEntity)
