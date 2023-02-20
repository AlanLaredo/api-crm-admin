import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { ProjectedDataEntity } from 'src/entities/client'

@InputType()
export class CreateProjectedDataInput extends OmitType(ProjectedDataEntity, [...IdentityLogEntityProps], InputType) {
}
