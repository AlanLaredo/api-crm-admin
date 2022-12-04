import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class BaseArgPagination {
  @Field(() => Int, { nullable: true })
    offset?: number = 0

  @Field(() => Int, { nullable: true })
    limit?: number = 10
}
