import { InputType, Field, OmitType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

import { UserEntity } from 'src/entities/user'
import IdentityLogEntityProps from 'src/entities/common/indentity-log.entity'

@InputType()
export class CreateUserInput extends OmitType(UserEntity, [...IdentityLogEntityProps, 'password'], InputType) {
  @IsNotEmpty()
  @IsString()
  @Field()
    password!: string
}
