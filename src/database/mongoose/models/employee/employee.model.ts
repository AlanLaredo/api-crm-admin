import { ModelDefinition, Schema, SchemaFactory } from '@nestjs/mongoose'
import { EmployeeEntity } from 'src/entities/employee'

@Schema({
  collection: 'employees'
})
export class Employee extends EmployeeEntity {
}

export const EmployeeModel: ModelDefinition = {
  name: Employee.name,
  schema: SchemaFactory.createForClass(Employee)
}
