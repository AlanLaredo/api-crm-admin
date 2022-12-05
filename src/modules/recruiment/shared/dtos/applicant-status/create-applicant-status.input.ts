import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ApplicantStatusEntity } from 'src/entities/recruiment'

@InputType()
export class CreateApplicantStatusInput extends OmitType(ApplicantStatusEntity, IdentityLogEntityProps, InputType) {
}
