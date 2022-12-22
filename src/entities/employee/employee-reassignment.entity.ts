import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsMongoId, IsOptional, IsString } from 'class-validator'
import mongoose, { Types } from 'mongoose'

import { ClientEntity } from '../client'
import { IdentityLogEntity } from '../common'
import { CompanyEntity } from '../company'
import { EmployeeEntity } from './employee.entity'

@ArgsType()
@InputType('EmployeeReassignmentsInput')
@ObjectType()
@Schema({
  collection: 'employee_reassignments'
})
export class EmployeeReassignmentEntity extends IdentityLogEntity {
  @Field(() => ID, { nullable: true })
    id?: Types.ObjectId

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    employeId!: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    transmitterClientId?: Types.ObjectId

  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
    receiverClientId?: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    reason?: string

  @IsMongoId()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    companyId!: Types.ObjectId

  @Field(() => CompanyEntity, { nullable: true })
    company?: CompanyEntity

  @Field(() => ClientEntity, { nullable: true })
    transmitterClient?: ClientEntity

  @Field(() => ClientEntity, { nullable: true })
    receiverClient?: ClientEntity

  @Field(() => EmployeeEntity, { nullable: true })
    employee?: EmployeeEntity
}

export const EmployeeReassignmentSchema = SchemaFactory.createForClass(EmployeeReassignmentEntity)
