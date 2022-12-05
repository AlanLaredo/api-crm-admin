import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { CompanyEntity } from 'src/entities/company'

@InputType()
export class CreateCompanyInput extends OmitType(CompanyEntity, IdentityLogEntityProps, InputType) {
}
