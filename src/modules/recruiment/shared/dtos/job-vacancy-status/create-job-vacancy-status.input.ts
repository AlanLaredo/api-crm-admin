import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { JobVacancyStatusEntity } from 'src/entities/recruiment'

@InputType()
export class CreateJobVacancyStatusInput extends OmitType(JobVacancyStatusEntity, IdentityLogEntityProps, InputType) {
}
