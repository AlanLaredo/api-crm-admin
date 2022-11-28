// /* eslint-disable no-useless-constructor */
// import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'

// // @UseGuards(JwtAuthGuard)
// @Resolver(of => UnitMeasureTypeObjectType)
// export class UnitMeasureTypeResolver {
//   constructor (private readonly unitmeasuretypeService: UnitMeasureTypeService) { }

//   @Query(returns => UnitMeasureTypeObjectType, { nullable: true })
//   async getUnitMeasureType (@Args() data: GetUnitMeasureTypeArgs): Promise<UnitMeasureTypeObjectType> {
//     return this.unitmeasuretypeService.getOne(data)
//   }
// }
