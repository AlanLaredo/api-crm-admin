import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserModel } from '../../models/user'
import { MainQueryMongoose } from '../main-query.mongoose'

@Injectable()
export class UserService extends MainQueryMongoose<UserModel> {
  constructor (
    @InjectModel(UserModel.name) private userModel: Model<UserModel>) {
    super(userModel)
  }
/*
  public async get (data: GetUsersFind = {}): Promise<UserEntity[]> {
    return await this.UserModel.find({ ...data, deletedAt: null }).select('-password').exec()
  }

  public async getById (id: Types.ObjectId): Promise<UserEntity> {
    const user = await this.UserModel.findById(
      id
    ).select('-password').exec()
    return user
  }

  public async find (data: GetUsersFind = {}): Promise<UserEntity[]> {
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

  public async create (data: UserEntity): Promise<UserEntity> {
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
