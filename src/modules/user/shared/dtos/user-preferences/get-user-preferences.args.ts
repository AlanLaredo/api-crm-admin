import { ArgsType, IntersectionType } from '@nestjs/graphql'
import { BaseArgPagination } from 'src/modules/common/shared/dtos'
import { UpdateUserPreferencesInput } from './update-user-preferences.input'

@ArgsType()
export class GetUserPreferencesArgs extends IntersectionType(UpdateUserPreferencesInput, BaseArgPagination, ArgsType) {
}
