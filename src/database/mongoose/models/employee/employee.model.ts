import { ModelDefinition } from '@nestjs/mongoose'

import { EmployeeEntity, EmployeeSchema } from 'src/entities/employee'

export const EmployeeModel: ModelDefinition = {
  name: EmployeeEntity.name,
  schema: EmployeeSchema
}
