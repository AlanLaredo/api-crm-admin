import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class AddressEntity {
  @Field()
  @Prop()
    name?: string

  @Field()
  @Prop()
    street?: string

  @Field()
  @Prop()
    exteriorNumber?: string

  @Field()
  @Prop()
    interiorNumber?: string

  @Field()
  @Prop()
    neightborhood?: string

  @Field()
  @Prop()
    city?: string

  @Field()
  @Prop()
    state?: string

  @Field()
  @Prop()
    country?: string

  @Field()
  @Prop()
    postalCode?: string
}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity)
