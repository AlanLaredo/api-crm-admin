import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { CustomerEntity } from 'src/entities/process'

@Schema({
  collection: 'curstomers'
})
export class Customer extends CustomerEntity {
}

export const CustomerModel: ModelDefinition = {
  name: Customer.name,
  schema: SchemaFactory.createForClass(Customer)
}
