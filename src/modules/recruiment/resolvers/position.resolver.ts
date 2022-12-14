/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreatePositionInput, UpdatePositionInput, GetPositionArgs } from '../shared/dtos/position'
import { PositionService } from 'src/database/mongoose/services/recruiment'
import { UserEntity } from 'src/entities/user'
import { PositionEntity } from 'src/entities/recruiment'
import { ClientService } from 'src/database/mongoose/services/client'
import { ClientEntity } from 'src/entities/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => PositionEntity)
export class PositionResolver {
  constructor (
    private readonly positionService: PositionService,
    private readonly clientService: ClientService) { }

  @Query(() => PositionEntity, { nullable: true })
  async position (@Args() data: GetPositionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PositionEntity> {
    return this.positionService.getOne(data)
  }

  @Query(() => [PositionEntity])
  async positions (@Args() data: GetPositionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PositionEntity[]> {
    const filters = { ...data }
    let result
    if (!user.isAdmin) {
      const clients = await this.clientService.get({ companyId: user.companyId })
      const clientIds = clients.map(client => client.id)
      result = await this.positionService.getWhereIn({ ...filters }, 'clientId', clientIds)
    }

    return result || this.positionService.get(filters)
  }

  @Query(() => [PositionEntity])
  async getPositionFind (@Args() data: GetPositionArgs): Promise<PositionEntity[]> {
    return this.positionService.find(data)
  }

  @ResolveField(() => ClientEntity, { nullable: true })
  async client (data: PositionEntity) {
    return this.clientService.getById(data.clientId)
  }

  @Mutation(() => PositionEntity)
  async createPosition (@Args('createPositionData') createPositionData: CreatePositionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PositionEntity> {
    return this.positionService.create({ ...createPositionData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => PositionEntity)
  async updatePosition (@Args('updatePositionData') updatePositionData: UpdatePositionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PositionEntity> {
    const { id, ...data } = updatePositionData
    return this.positionService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => PositionEntity)
  async deletePosition (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PositionEntity> {
    return this.positionService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
