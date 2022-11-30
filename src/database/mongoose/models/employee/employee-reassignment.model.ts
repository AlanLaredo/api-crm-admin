import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'

import { EmployeeReassignmentEntity } from 'src/entities/employee'

@Schema({
  collection: 'employee_reassignments'
})
export class EmployeeReassignment extends EmployeeReassignmentEntity {
}

export const EmployeeReassignmentModel: ModelDefinition = {
  name: EmployeeReassignment.name,
  schema: SchemaFactory.createForClass(EmployeeReassignment)
}
