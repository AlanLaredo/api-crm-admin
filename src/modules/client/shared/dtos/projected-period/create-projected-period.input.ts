import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ProjectedPeriodEntity } from 'src/entities/client'

@InputType()
export class CreateProjectedPeriodInput extends OmitType(ProjectedPeriodEntity, [...IdentityLogEntityProps], InputType) {
}
