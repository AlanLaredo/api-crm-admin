import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { EmployeeEntity } from 'src/entities/employee'

@InputType()
export class CreateEmployeeInput extends OmitType(EmployeeEntity, IdentityLogEntityProps, InputType) {
}
