import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { CompanyUserEntity } from 'src/entities/company'

@InputType()
export class CreateCompanyUserInput extends OmitType(CompanyUserEntity, IdentityLogEntityProps, InputType) {
}
