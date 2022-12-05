/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateActionLogInput, UpdateActionLogInput, GetActionLogArgs } from '../shared/dtos/action-log'
import { UserEntity } from 'src/entities/user'
import { ActionLogEntity } from 'src/entities/core'
import { ActionLogService } from 'src/database/mongoose/services/core'

@UseGuards(JwtAuthGuard)
@Resolver(() => ActionLogEntity)
export class ActionLogResolver {
  constructor (
    private readonly actionLogService: ActionLogService) { }

  @Query(() => ActionLogEntity, { nullable: true })
  async actionLog (@Args() data: GetActionLogArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ActionLogEntity> {
    return this.actionLogService.getOne(data)
  }

  @Query(() => [ActionLogEntity])
  async jobVacancies (@Args() data: GetActionLogArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ActionLogEntity[]> {
    return this.actionLogService.get(data)
  }

  @Query(() => [ActionLogEntity])
  async getActionLogFind (@Args() data: GetActionLogArgs): Promise<ActionLogEntity[]> {
    return this.actionLogService.find(data)
  }

  @Mutation(() => ActionLogEntity)
  async createActionLog (@Args('createActionLogData') createActionLogData: CreateActionLogInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ActionLogEntity> {
    return this.actionLogService.create({ ...createActionLogData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ActionLogEntity)
  async updateActionLog (@Args('updateActionLogData') updateActionLogData: UpdateActionLogInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ActionLogEntity> {
    const { id, ...data } = updateActionLogData
    return this.actionLogService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ActionLogEntity)
  async deleteActionLog (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ActionLogEntity> {
    return this.actionLogService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
