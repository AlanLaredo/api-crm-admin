/* eslint-disable no-useless-constructor */
// TODO: Add paginator and limit
import { Model, Types } from 'mongoose'

export abstract class BaseServiceMongoose<T> {
  public MainModel: Model<any>
  constructor (MainModel: Model<T>) {
    this.MainModel = MainModel
  }

  public async get (data: any = {}): Promise<T[]> {
    if (data.id) {
      data._id = data.id
      delete data.id
    }
    return this.MainModel.find({
      ...data,
      deletedAt: null
    })
  }

  public async getWhereIn (data: Partial<any> = {}, column: string, array: any[]): Promise<T[]> {
    if (data.id) {
      data._id = data.id
      delete data.id
    }
    return this.MainModel.find({
      ...data,
      deletedAt: null
    }).where(column).in(array)
  }

  public async getOne (data: Partial<any> = {}): Promise<T> {
    if (data.id) {
      data._id = data.id
      delete data.id
    }
    return this.MainModel.findOne({
      ...data,
      deletedAt: null
    })
  }

  public async aggregate (data: Partial<any[]> = []): Promise<T[]> {
    return this.MainModel.aggregate(data)
  }

  public async find (data: Partial<T> = {}): Promise<T[]> {
    const filters: any = {}
    Object.keys(data)
      .map(key => {
        filters[key] = {
          $regex: data[key].toLowerCase(),
          $options: 'i'
        }
        return null
      })
    return this.MainModel.find({
      ...filters,
      deletedAt: null
    })
  }

  public async getById (id: Types.ObjectId): Promise<T> {
    return this.MainModel.findById(
      id
    )
  }

  public async getByIds (ids: Types.ObjectId[]): Promise<T[]> {
    return this.MainModel.find()
      .where('_id')
      .in(ids)
  }

  public async create (data: any): Promise<T> {
    return new this.MainModel({
      ...data
    }).save()
  }

  public async update (id: Types.ObjectId, data: Partial<T>): Promise<T> {
    return this.MainModel.findByIdAndUpdate(
      id, {
        $set: data
      },
      { new: true })
  }

  public async updateMany (filter: Partial<T>, data: any): Promise<any> {
    return this.MainModel.updateMany({
      ...filter
    }, {
      $set: data
    },
    { new: true })
  }

  public async delete (id: Types.ObjectId, data: Partial<T>): Promise<T> {
    return this.MainModel.findByIdAndUpdate(
      id, {
        $set: data
      },
      { new: true })
  }

  public async permanentDeleteOne (filter: Partial<any>): Promise<any> {
    if (filter.id) {
      filter._id = filter.id
      delete filter.id
    }
    return this.MainModel.deleteOne(filter)
  }

  public async permanentDeleteFind (data: any): Promise<any> {
    return this.MainModel.find({
      ...data
    }).remove()
  }
}
