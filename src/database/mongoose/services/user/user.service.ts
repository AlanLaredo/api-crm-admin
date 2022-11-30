import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserEntity } from 'src/entities/user'

import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class UserService extends BaseServiceMongoose<UserEntity> {
  constructor (
    @InjectModel(UserEntity.name) private mainModel: Model<UserEntity>) {
    super(mainModel)
  }
/*
  public async get (data: GetUsersFind = {}): Promise<User[]> {
    return await this.UserModel.find({ ...data, deletedAt: null }).select('-password').exec()
  }

  public async getById (id: Types.ObjectId): Promise<User> {
    const user = await this.UserModel.findById(
      id
    ).select('-password').exec()
    return user
  }

  public async find (data: GetUsersFind = {}): Promise<User[]> {
    const filters: any = {}
    Object.keys(data)
      .map(key => {
        filters[key] = {
          $regex: data[key].toLowerCase(),
          $options: 'i'
        }
        return null
      })
    return await this.UserModel.find({ ...data, deletedAt: null }).select('-password').exec()
  }

  public async create (data: User): Promise<User> {
    data.username = data.username.trim().toLowerCase()
    data.password = await this.authService.getHashPassword(data.password)
    const newUser = await new this.UserModel({
      ...data
    }).save()
    const { password, ...rta } = newUser.toJSON()
    return { id: rta._id, ...rta }
  }

  public async getTotalUsers (): Promise<number> {
    return this.UserModel.count().exec()
  }
  */
}
