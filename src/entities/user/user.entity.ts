import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'users'
})
export class UserEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true, unique: true })
    username!: string

  @Prop({ required: true })
    password?: string

  @Prop({ required: true, unique: true })
    email!: string

  @Prop({ required: true })
    firstName!: string

  @Prop()
    lastName?: string

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    roleAccessId?: Types.ObjectId
}
