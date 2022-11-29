import { IModel } from '../../interfaces'
import { ApplicantStatusModel, ApplicantStatus } from './applicant-status.model'
import { JobVacancyStatusModel, JobVacancyStatus } from './job-vacancy-status.model'
import { JobVacancyModel, JobVacancy } from './job-vacancy.model'
import { PositionModel, Position } from './position.model'
import { RecruitModel, Recruit } from './recruit.model'

export const RECRUITMENT_MODELS: IModel[] = [
  ApplicantStatusModel,
  JobVacancyModel,
  JobVacancyStatusModel,
  PositionModel,
  RecruitModel
]

export {
  ApplicantStatus,
  JobVacancy,
  JobVacancyStatus,
  Position,
  Recruit
}
