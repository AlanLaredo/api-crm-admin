import { RolePermissionEntity } from 'src/entities/user'

export const ROLE_PERMISSIONS: Partial<RolePermissionEntity>[] = [{
  name: 'Nuevo servicio registrado',
  description: 'Recepción de email al momento de que un colaborador completa el ciclo de Leads de un servicio nuevo.',
  tag: 'admin.emailNotification.newClientService'
}, {
  name: 'Nuevo empleado registrado',
  description: 'Recepción de email al momento de que un colaborador completa el registro de un nuevo empleado.',
  tag: 'admin.emailNotification.newClientService'
}]
