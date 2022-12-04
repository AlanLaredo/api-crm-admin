import { MongoError } from 'mongodb'
import { HttpException } from '@nestjs/common'
import { ExecutionResult } from 'graphql'

export default (execution: ExecutionResult) => {
  const response = { statusCode: 500, response: execution }
  const [error] = execution.errors
  const originalError = error?.originalError

  if (originalError instanceof MongoError) {
    let csMessge: string
    if (originalError.code === 11000) {
      csMessge = 'duplicate items'
    }
    response.statusCode = 500
    response.response = {
      data: {
        ...originalError,
        csMessge
      }
    } as any
  } else if (originalError instanceof HttpException) {
    response.statusCode = originalError.getStatus()
    response.response = { data: originalError.getResponse() } as any
  }
  return response
}
