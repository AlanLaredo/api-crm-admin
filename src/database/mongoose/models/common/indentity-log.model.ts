import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'

@Schema()
export abstract class IdentityLogModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    createdBy: Types.ObjectId

  @Prop({ required: true })
    createdAt: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
    modifiedBy?: Types.ObjectId

  @Prop({ required: false })
    modifiedAt?: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
    deletedBy?: Types.ObjectId

  @Prop({ required: false })
    deletedAt?: Date
}
