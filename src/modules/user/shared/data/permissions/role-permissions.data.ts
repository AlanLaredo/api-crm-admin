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
  description: 'Administración usuarios',
  tag: 'users.set'
}, {
  name: 'Eliminar usuarios',
  description: 'Remueve un usuario',
  tag: 'users.delete'
}, {
  name: 'Módulo de roles',
  description: 'Listado de módulos',
  tag: 'roles'
}, {
  name: 'Creación/Modificación de roles',
  description: 'Administración de roles',
  tag: 'roles.set'
}, {
  name: 'Eliminar roles',
  description: 'Remueve un rol',
  tag: 'roles.delete'
}, {
  name: 'companyGroups',
  description: 'companyGroups',
  tag: 'companyGroups'
}, {
  name: 'Creación/Modificación de grupos',
  description: 'Administración de grupos',
  tag: 'companyGroups.set'
}, {
  name: 'Eliminar grupos',
  description: 'Remueve un grupo',
  tag: 'companyGroups.delete'
}, {
  name: 'Módulo de compañías',
  description: 'Acceso a compañías',
  tag: 'company'
}, {
  name: 'Creación/Modificación de compañías',
  description: 'Administración de compañías',
  tag: 'company.set'
}, {
  name: 'Eliminar compañías',
  description: 'Remueve una compañía',
  tag: 'company.delete'
}, {
  name: 'customers',
  description: 'customers',
  tag: 'customers'
}, {
  name: 'Creación/Modificación de procesos',
  description: 'Administración de procesos',
  tag: 'operations.set'
}, {
  name: 'Eliminar procesos',
  description: 'Remueve un proceso',
  tag: 'operations.delete'
}, {
  name: 'Módulo de procesos',
  description: 'Acceso a procesos',
  tag: 'operations'
}, {
  name: 'Módulo de clientes',
  description: 'Acceso a clientes',
  tag: 'clients'
}, {
  name: 'Creación/Modificación de clientes',
  description: 'Administración de clientes',
  tag: 'clients.set'
}, {
  name: 'Eliminar clientes',
  description: 'Remueve un cliente',
  tag: 'clients.delete'
}, {
  name: 'Módulo de empleados',
  description: 'Eliminar empleados',
  tag: 'employees'
}, {
  name: 'Creación/Modificación de empleados',
  description: 'Administración de empleados',
  tag: 'employees.set'
}, {
  name: 'Eliminar empleados',
  description: 'Remueve empleados',
  tag: 'employees.delete'
}, {
  name: 'Módulo vacantes',
  description: 'Acceso a vacantes',
  tag: 'jobVavancy'
}, {
  name: 'Creación/Modificación de Vacantes',
  description: 'Administración de vacantes',
  tag: 'jobVavancy.set'
}, {
  name: 'Eliminar vacantes',
  description: 'Remueve vacantes',
  tag: 'jobVavancy.delete'
}, {
  name: 'Módulo de puestos',
  description: 'Aceso a puestos',
  tag: 'positions'
}, {
  name: 'Creación/Modificación de puestos',
  description: 'Administración de puestos',
  tag: 'positions.set'
}, {
  name: 'Eliminar puestos',
  description: 'Remueve puestos',
  tag: 'positions.delete'
}, {
  name: 'Módulo prenómina',
  description: 'Acceso prenómina',
  tag: 'prenominal'
}, {
  name: 'Creación/Modificación de prenómina',
  description: 'Administración de prenómina',
  tag: 'prenominal.set'
}, {
  name: 'Eliminar prenómina',
  description: 'Remueve prenómina',
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
