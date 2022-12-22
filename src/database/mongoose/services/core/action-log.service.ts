/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ActionLogEntity } from 'src/entities/core'
import { BaseServiceMongoose } from '../common/base-service.mongoose'

@Injectable()
export class ActionLogService extends BaseServiceMongoose<ActionLogEntity> {
  constructor (
    @InjectModel(ActionLogEntity.name) public mainModel: Model<ActionLogEntity>
  ) {
    super(mainModel)
  }

  testDiffObjects () {
    const diffObjects = this.deepDiffMapper()
    const original = {
      username: 'alan',
      email: 'santiagoalan1@gmail.com',
      address: {
        street: '2da avenida',
        externalNumber: 54,
        internalNumber: 1
      }
    }
    const afterUpdated = {
      username: 'alan222',
      apPat: 'Laredo',
      address: {
        street: '2da avenida',
        externalNumber: 53
      }
    }
    const result: any = diffObjects.map(original, afterUpdated)

    const transpilation = this.objectToArray(result)
    console.log(result)
    console.log(transpilation)
  }

  objectToArray (object: any, parentKey: string = '') {
    let result: any[] = []

    if ('data' in object && 'type' in object) {
      result.push({ key: parentKey, ...object })
    } else if (Object.prototype.toString.call(object) === '[object Object]') {
      Object.keys(object).forEach(key => {
        result = [...result, ...this.objectToArray(object[key], parentKey !== '' ? parentKey + '.' + key : key)]
      })
    }
    return result
  }

  deepDiffMapper () {
    return {
      VALUE_CREATED: 'created',
      VALUE_UPDATED: 'updated',
      VALUE_DELETED: 'deleted',
      VALUE_UNCHANGED: 'unchanged',
      map: function (obj1: any, obj2: any) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
          throw new Error('Invalid argument. Function given, object expected.')
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
          const typeComparationResult = this.compareValues(obj1, obj2)
          const result: any = {
            type: typeComparationResult,
            data: obj1 === undefined ? obj2 : obj1
          }
          if (typeComparationResult === this.VALUE_UPDATED) {
            result.newData = obj2
          }
          return result
        }

        const diff: any = {}
        for (const key in obj1) {
          if (this.isFunction(obj1[key])) {
            continue
          }

          let value2
          if (obj2[key] !== undefined) {
            value2 = obj2[key]
          }

          diff[key] = this.map(obj1[key], value2)
        }
        for (const key in obj2) {
          if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
            continue
          }

          diff[key] = this.map(undefined, obj2[key])
        }
        return diff
      },
      compareValues: function (value1: any, value2: any) {
        if (value1 === value2) {
          return this.VALUE_UNCHANGED
        }
        if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
          return this.VALUE_UNCHANGED
        }
        if (value1 === undefined) {
          return this.VALUE_CREATED
        }
        if (value2 === undefined) {
          return this.VALUE_DELETED
        }
        return this.VALUE_UPDATED
      },
      isFunction: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Function]'
      },
      isArray: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Array]'
      },
      isDate: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Date]'
      },
      isObject: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Object]'
      },
      isValue: function (x: any) {
        return !this.isObject(x) && !this.isArray(x)
      }
    }
  }
}
