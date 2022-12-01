import { Injectable, ExecutionContext, BadRequestException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor (private reflector: Reflector) {
    super(reflector)
  }

  canActivate (context: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) {
      return true
    }
    const gqlContext = GqlExecutionContext.create(context)
    let { req } = gqlContext.getContext()

    if (!req) {
      req = context.switchToHttp().getRequest()
    }

    let authHeader = ''
    // let token: string = ''
    if (req.headers && req.headers.authorization) {
      authHeader = req.headers.authorization as string
      if (authHeader === '') {
        throw new BadRequestException('Token not found')
      } else {
        // token = authHeader.replace('Bearer ', '')
        // console.log(token) // check if exists on database
      }
    } else {
      throw new BadRequestException('Token not found')
    }
    // jwt ya valida que este token no esté expirado
    // pero valida el token de cualquier usuario
    // agregar validación de base de datos en segunda etapa
    return super.canActivate(new ExecutionContextHost([req]))
  }
}
