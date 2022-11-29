import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { IdentityLogEntity } from '../common'

@Schema({
  collection: 'job_vacancy_status'
})
export class JobVacancyStatusEntity extends IdentityLogEntity {
  id?: Types.ObjectId

  @Prop({ required: true })
    name!: string

  @Prop()
    description?: string
}
