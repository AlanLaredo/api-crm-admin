import { ModelDefinition } from '@nestjs/mongoose'

import { RolePermissionEntity, RolePermissionSchema } from 'src/entities/user'

export const RolePermissionModel: ModelDefinition = {
  name: RolePermissionEntity.name,
  schema: RolePermissionSchema
}
