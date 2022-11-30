import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { UserEntity } from 'src/entities/user'

@Schema({
  collection: 'users'
})
export class User extends UserEntity {
}

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: SchemaFactory.createForClass(User)
}
