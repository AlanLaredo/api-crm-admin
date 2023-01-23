import { RolePermissionEntity } from 'src/entities/user'

export const ROLE_PERMISSIONS: Partial<RolePermissionEntity>[] = [{
  name: 'Nuevo servicio registrado',
  description: 'Recepción de email al momento de que un colaborador completa el ciclo de Leads de un servicio nuevo.',
  tag: 'admin.emailNotification.newClientService'
}, {
  name: 'Nuevo empleado registrado',
  description: 'Recepción de email al momento de que un colaborador completa el registro de un nuevo empleado.',
  tag: 'admin.emailNotification.newEmployee'
}, {
  name: 'Módulo usuarios',
  description: 'Listado de usuarios',
  tag: 'users'
}, {
  name: 'Creación/Modificación de usuarios',
  description: 'users.set',
  tag: 'users.set'
}, {
  name: 'users.delete',
  description: 'users.delete',
  tag: 'users.delete'
}, {
  name: 'roles',
  description: 'roles',
  tag: 'roles'
}, {
  name: 'roles.set',
  description: 'roles.set',
  tag: 'roles.set'
}, {
  name: 'roles.delete',
  description: 'roles.delete',
  tag: 'roles.delete'
}, {
  name: 'companyGroups',
  description: 'companyGroups',
  tag: 'companyGroups'
}, {
  name: 'companyGroups.set',
  description: 'companyGroups.set',
  tag: 'companyGroups.set'
}, {
  name: 'companyGroups.delete',
  description: 'companyGroups.delete',
  tag: 'companyGroups.delete'
}, {
  name: 'company',
  description: 'company',
  tag: 'company'
}, {
  name: 'company.set',
  description: 'company.set',
  tag: 'company.set'
}, {
  name: 'company.delete',
  description: 'company.delete',
  tag: 'company.delete'
}, {
  name: 'customers',
  description: 'customers',
  tag: 'customers'
}, {
  name: 'operations.set',
  description: 'operations.set',
  tag: 'operations.set'
}, {
  name: 'operations.delete',
  description: 'operations.delete',
  tag: 'operations.delete'
}, {
  name: 'operations',
  description: 'operations',
  tag: 'operations'
}, {
  name: 'clients',
  description: 'clients',
  tag: 'clients'
}, {
  name: 'clients.set',
  description: 'clients.set',
  tag: 'clients.set'
}, {
  name: 'clients.delete',
  description: 'clients.delete',
  tag: 'clients.delete'
}, {
  name: 'employees',
  description: 'employees',
  tag: 'employees'
}, {
  name: 'employees.set',
  description: 'employees.set',
  tag: 'employees.set'
}, {
  name: 'employees.delete',
  description: 'employees.delete',
  tag: 'employees.delete'
}, {
  name: 'jobVavancy',
  description: 'jobVavancy',
  tag: 'jobVavancy'
}, {
  name: 'jobVavancy.set',
  description: 'jobVavancy.set',
  tag: 'jobVavancy.set'
}, {
  name: 'jobVavancy.delete',
  description: 'jobVavancy.delete',
  tag: 'jobVavancy.delete'
}, {
  name: 'positions',
  description: 'positions',
  tag: 'positions'
}, {
  name: 'positions.set',
  description: 'positions.set',
  tag: 'positions.set'
}, {
  name: 'positions.delete',
  description: 'positions.delete',
  tag: 'positions.delete'
}, {
  name: 'prenominal',
  description: 'prenominal',
  tag: 'prenominal'
}, {
  name: 'prenominal.set',
  description: 'prenominal.set',
  tag: 'prenominal.set'
}, {
  name: 'prenominal.delete',
  description: 'prenominal.delete',
  tag: 'prenominal.delete'
}, {
  name: 'Bitácora operativa',
  description: 'Registro de trabajo diario',
  tag: 'operation-binnacle'
}, {
  name: 'Home',
  description: 'Pantalla Home',
  tag: 'home'
}]
