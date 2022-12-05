import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { CompanyGroupEntity } from 'src/entities/company'

@InputType()
export class CreateCompanyGroupInput extends OmitType(CompanyGroupEntity, IdentityLogEntityProps, InputType) {
}
