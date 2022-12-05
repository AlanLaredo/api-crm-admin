import { InputType, OmitType } from '@nestjs/graphql'

import { IdentityLogEntityProps } from 'src/entities/common/'
import { EmployeeReassignmentEntity } from 'src/entities/employee'

@InputType()
export class CreateEmployeeReassignmentInput extends OmitType(EmployeeReassignmentEntity, IdentityLogEntityProps, InputType) {
}
