import { InputType, OmitType } from '@nestjs/graphql'

import { PersonEntity } from 'src/entities/common/'

@InputType()
export class CreatePersonInput extends OmitType(PersonEntity, [], InputType) {
}
