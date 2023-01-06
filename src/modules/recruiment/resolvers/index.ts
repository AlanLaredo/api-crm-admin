import { JobVacancyResolver } from './job-vacancy.resolver'
import { PositionResolver } from './position.resolver'
import { RecruitResolver } from './recruit.resolver'

export const RECRUIMENT_RESOLVERS = [
  JobVacancyResolver,
  PositionResolver,
  RecruitResolver
]

export {
  JobVacancyResolver,
  PositionResolver,
  RecruitResolver
}
