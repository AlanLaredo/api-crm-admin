import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNumber, IsOptional, IsString } from 'class-validator'

@ObjectType()
@InputType('CreatePrenomionaPeriodVacanciesConfigurationInput')
@Schema()
export class PrenomionaPeriodVacanciesConfigurationEntity {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    clientName?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @Prop()
    clientServiceName?: string

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  @Prop()
    totalVacancies?: number
}

export const PrenomionaPeriodVacanciesConfigurationSchema = SchemaFactory.createForClass(PrenomionaPeriodVacanciesConfigurationEntity)
