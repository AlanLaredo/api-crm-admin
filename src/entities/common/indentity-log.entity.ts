import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

@Schema()
export abstract class IdentityLogEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    createdBy!: Types.ObjectId

  @Prop({ required: true })
    createdAt!: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    modifiedBy?: Types.ObjectId

  @Prop()
    modifiedAt?: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId })
    deletedBy?: Types.ObjectId

  @Prop()
    deletedAt?: Date
}
