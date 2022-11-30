import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { RecruitEntity } from 'src/entities/recruiment'

@Schema({
  collection: 'recruits'
})
export class Recruit extends RecruitEntity {
}

export const RecruitModel: ModelDefinition = {
  name: Recruit.name,
  schema: SchemaFactory.createForClass(Recruit)
}
