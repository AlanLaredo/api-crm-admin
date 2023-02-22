/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateProjectedPeriodInput, UpdateProjectedPeriodInput, GetProjectedPeriodArgs } from '../shared/dtos/projected-period'
import { UserEntity } from 'src/entities/user'
import { ClientEntity, ClientServiceEntity, ProjectedDataEntity, ProjectedPeriodEntity } from 'src/entities/client'
import { ClientService, ClientServiceService, ProjectedDataService, ProjectedPeriodService } from 'src/database/mongoose/services/client'
import { DateTime } from 'luxon'

@UseGuards(JwtAuthGuard)
@Resolver(() => ProjectedPeriodEntity)
export class ProjectedPeriodResolver {
  constructor (
    private readonly projectedPeriodService: ProjectedPeriodService,
    private readonly clientServiceService: ClientServiceService,
    private readonly clientService: ClientService,
    private readonly projectedDataService: ProjectedDataService) { }

  @Query(() => ProjectedPeriodEntity, { nullable: true })
  async projectedPeriod (@Args() data: GetProjectedPeriodArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedPeriodEntity> {
    const projectedPeriod = await this.projectedPeriodService.getOne(data)
    return projectedPeriod
  }

  @Query(() => [ProjectedPeriodEntity])
  async projectedPeriods (@Args() data: GetProjectedPeriodArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedPeriodEntity[]> {
    return this.projectedPeriodService.get({ ...data, companyId: user.companyId })
  }

  @Query(() => [ProjectedPeriodEntity])
  async getProjectedPeriodFind (@Args() data: GetProjectedPeriodArgs): Promise<ProjectedPeriodEntity[]> {
    return this.projectedPeriodService.find(data)
  }

  @Mutation(() => ProjectedPeriodEntity)
  async createProjectedPeriod (@Args('createProjectedPeriodData') createProjectedPeriodData: CreateProjectedPeriodInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedPeriodEntity> {
    const projectedPeriod: ProjectedPeriodEntity = await this.projectedPeriodService.create({ ...createProjectedPeriodData, companyId: user.companyId, createdBy: user.id, createdAt: new Date() })
    await this.createProjectedData(projectedPeriod, user.companyId, user)
    return projectedPeriod
  }

  @Mutation(() => ProjectedPeriodEntity)
  async updateProjectedPeriod (@Args('updateProjectedPeriodData') updateProjectedPeriodData: UpdateProjectedPeriodInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedPeriodEntity> {
    const { id, ...data } = updateProjectedPeriodData
    return this.projectedPeriodService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ProjectedPeriodEntity)
  async deleteProjectedPeriod (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedPeriodEntity> {
    return this.projectedPeriodService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }

  async createProjectedData (projectedPeriod: ProjectedPeriodEntity, companyId: any, user: UserEntity) {
    const clients: ClientEntity[] = await this.clientService.get({ companyId })
    const clientIds = clients.map(client => client.id)
    const clientServices: ClientServiceEntity[] = await this.clientServiceService.get({ clientId: clientIds })

    const projectedDatas: Promise<ProjectedDataEntity>[] = []

    clientServices.forEach(
      (clientService: ClientServiceEntity) => {
        const date: DateTime = DateTime.fromJSDate(new Date(projectedPeriod.date))
        const startDate = date.startOf('month')

        const days: any = this.getPeriodDays(startDate, clientService.billing || 'monthly')
        const serviceCost = clientService.serviceCost ? clientService.serviceCost : 0
        const pricePerPeriod = serviceCost === 0 ? 0 : serviceCost / days.length
        const client = clients.find(client => String(client.id) === String(clientService.clientId))

        days.forEach((day: any, index: number) => {
          const projectedData: ProjectedDataEntity = {
            projectedPeriodId: projectedPeriod.id,
            clientKeycode: client.keycode ? client.keycode : '',
            clientServiceKeycode: clientService.keycode ? clientService.keycode : '',
            startDate: day.startDate.toJSDate(),
            clientName: client.businessName + ' ' + clientService.name, // (razón social de cliente + nombre de servicio)
            clientServiceId: clientService.id,
            serviceCost: pricePerPeriod,
            description: clientService.description,
            invoiceName: null,
            invoiceTotal: pricePerPeriod,
            invoiceTypePayment: String(day.startDate.day).padStart(2, '0') + ' AL ' + day.endDate.setLocale('es').toFormat("dd 'de' MMMM 'del' yy").toUpperCase(), /// here
            createdBy: user.id,
            createdAt: new Date()
          }
          projectedDatas.push(this.projectedDataService.create(projectedData))
        })
      }
    )

    return Promise.all(projectedDatas)
  }

  getPeriodDays (date: DateTime, billing: string): any[] {
    const days: any[] = []
    if (billing === 'monthly') {
      return [{ startDate: date, endDate: date.endOf('month').startOf('day') }]
    }
    if (billing === 'biweekly') {
      return [
        { startDate: date, endDate: date.set({ day: 15 }) }, { startDate: date.set({ day: 16 }), endDate: date.endOf('month').startOf('day') }
      ]
    }
    Array.from(Array(date.daysInMonth).keys()).forEach(index => {
      if (this.weekendsDatesFilter(date.set({ day: index + 1 }).toJSDate())) {
        days.push({ startDate: date.set({ day: index + 1 }), endDate: date.set({ day: index }).plus({ days: 7 }) })
      }
    })
    return days
  }

  weekendsDatesFilter (d: Date | null) {
    const day = d?.getDay()
    return day === 1
  }
}
