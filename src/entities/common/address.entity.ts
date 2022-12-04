import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class AddressEntity {
  @Field({ nullable: true })
  @Prop()
    name?: string

  @Field({ nullable: true })
  @Prop()
    street?: string

  @Field({ nullable: true })
  @Prop()
    exteriorNumber?: string

  @Field({ nullable: true })
  @Prop()
    interiorNumber?: string

  @Field({ nullable: true })
  @Prop()
    neightborhood?: string

  @Field({ nullable: true })
  @Prop()
    city?: string

  @Field({ nullable: true })
  @Prop()
    state?: string

  @Field({ nullable: true })
  @Prop()
    country?: string

  @Field({ nullable: true })
  @Prop()
    postalCode?: string
}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity)
