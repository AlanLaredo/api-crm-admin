import { ApplicantStatusService } from './applicant-status.service'
import { JobVacancyStatusService } from './job-vacancy-status.service'
import { JobVacancyService } from './job-vacancy.service'
import { PositionService } from './position.service'
import { RecruitService } from './recruit.service'

export const RECRUIMENT_SERVICES = [
  ApplicantStatusService,
  JobVacancyStatusService,
  JobVacancyService,
  PositionService,
  RecruitService
]

export {
  ApplicantStatusService,
  JobVacancyStatusService,
  JobVacancyService,
  PositionService,
  RecruitService
}
