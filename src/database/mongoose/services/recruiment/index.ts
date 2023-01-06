import { JobVacancyService } from './job-vacancy.service'
import { PositionService } from './position.service'
import { RecruitService } from './recruit.service'

export const RECRUIMENT_SERVICES = [
  JobVacancyService,
  PositionService,
  RecruitService
]

export {
  JobVacancyService,
  PositionService,
  RecruitService
}
