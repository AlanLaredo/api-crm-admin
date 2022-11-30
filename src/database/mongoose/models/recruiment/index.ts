import { IModel } from '../../interfaces'
import { ApplicantStatusModel } from './applicant-status.model'
import { JobVacancyStatusModel } from './job-vacancy-status.model'
import { JobVacancyModel } from './job-vacancy.model'
import { PositionModel } from './position.model'
import { RecruitModel } from './recruit.model'

export const RECRUITMENT_MODELS: IModel[] = [
  ApplicantStatusModel,
  JobVacancyModel,
  JobVacancyStatusModel,
  PositionModel,
  RecruitModel
]
