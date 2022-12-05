import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { RecruitEntity } from 'src/entities/recruiment'

@InputType()
export class CreateRecruitInput extends OmitType(RecruitEntity, [...IdentityLogEntityProps], InputType) {
}
