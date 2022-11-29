import { Prop, Schema } from '@nestjs/mongoose'

@Schema()
export abstract class AddressEntity {
  @Prop()
    name?: string

  @Prop()
    street?: string

  @Prop()
    exteriorNumber?: string

  @Prop()
    interiorNumber?: string

  @Prop()
    neightborhood?: string

  @Prop()
    city?: string

  @Prop()
    state?: string

  @Prop()
    country?: string

  @Prop()
    postalCode?: string
}
