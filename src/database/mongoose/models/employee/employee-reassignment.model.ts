import { ModelDefinition } from '@nestjs/mongoose'

import { EmployeeReassignmentEntity, EmployeeReassignmentSchema } from 'src/entities/employee'

export const EmployeeReassignmentModel: ModelDefinition = {
  name: EmployeeReassignmentEntity.name,
  schema: EmployeeReassignmentSchema
}
