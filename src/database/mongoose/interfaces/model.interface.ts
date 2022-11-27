import * as mongoose from 'mongoose'

export default class IModel {
  name!: string
  schema!: mongoose.Schema
}
