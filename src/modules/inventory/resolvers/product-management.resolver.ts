/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateProductManagementInput, UpdateProductManagementInput, GetProductManagementArgs } from '../shared/dtos/product-management'
import { UserEntity } from 'src/entities/user'
import { ProductManagementEntity } from 'src/entities/inventory'
import { ProductManagementService } from 'src/database/mongoose/services/inventory'


@UseGuards(JwtAuthGuard)
@Resolver(() => ProductManagementEntity)
export class ProductManagementResolver {
  constructor (
    private readonly productManagementService: ProductManagementService) { }

  @Query(() => ProductManagementEntity, { nullable: true })
  async productManagement (@Args() data: GetProductManagementArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProductManagementEntity> {
    return this.productManagementService.getOne(data)
  }

  @Query(() => [ProductManagementEntity])
  async productManagements (@Args() data: GetProductManagementArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProductManagementEntity[]> {
    return this.productManagementService.get(user.isAdmin ? data : { ...data, companyId: user.companyId })
  }

  @Query(() => [ProductManagementEntity])
  async getProductManagementFind (@Args() data: GetProductManagementArgs): Promise<ProductManagementEntity[]> {
    return this.productManagementService.find(data)
  }

  @Mutation(() => ProductManagementEntity)
  async createProductManagement (@Args('createProductManagementData') createProductManagementData: CreateProductManagementInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProductManagementEntity> {
    return this.productManagementService.create({ ...createProductManagementData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ProductManagementEntity)
  async updateProductManagement (@Args('updateProductManagementData') updateProductManagementData: UpdateProductManagementInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProductManagementEntity> {
    const { id, ...data } = updateProductManagementData
    return this.productManagementService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ProductManagementEntity)
  async deleteProductManagement (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProductManagementEntity> {
    return this.productManagementService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
