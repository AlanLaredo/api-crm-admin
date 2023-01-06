import { IModel } from '../../interfaces'
import { JobVacancyModel } from './job-vacancy.model'
import { PositionModel } from './position.model'
import { RecruitModel } from './recruit.model'

export const RECRUITMENT_MODELS: IModel[] = [
  JobVacancyModel,
  PositionModel,
  RecruitModel
]
