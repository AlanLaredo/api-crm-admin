import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { JobVacancyEntity } from 'src/entities/recruiment'

@InputType()
export class CreateJobVacancyInput extends OmitType(JobVacancyEntity, [...IdentityLogEntityProps, 'clientService', 'position', 'recruits'], InputType) {
}
