import { ApplicantStatusResolver } from './applicant-status.resolver'
import { JobVacancyStatusResolver } from './job-vacancy-status.resolver'
import { JobVacancyResolver } from './job-vacancy.resolver'
import { PositionResolver } from './position.resolver'
import { RecruitResolver } from './recruit.resolver'

export const RECRUIMENT_RESOLVERS = [
  ApplicantStatusResolver,
  JobVacancyStatusResolver,
  JobVacancyResolver,
  PositionResolver,
  RecruitResolver
]

export {
  ApplicantStatusResolver,
  JobVacancyStatusResolver,
  JobVacancyResolver,
  PositionResolver,
  RecruitResolver
}
