/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import { Types } from 'mongoose'
import { ClientService, ClientServiceService } from 'src/database/mongoose/services/client'
import { EmployeeService, OperationService } from 'src/database/mongoose/services/employee'
import { PrenominaConfigurationService, PrenominaPeriodEmployeeDayService, PrenominaPeriodEmployeeService, PrenominaPeriodService } from 'src/database/mongoose/services/prenomina'
import { PositionService } from 'src/database/mongoose/services/recruiment'
import { ClientEntity, ClientServiceEntity } from 'src/entities/client'
import { EmployeeEntity, OperationEntity } from 'src/entities/employee'
import { PrenominaConfigurationEntity, PrenominaPeriodEmployeeDayEntity, PrenominaPeriodEmployeeEntity, PrenominaPeriodEntity, PrenomionaPeriodVacanciesConfigurationEntity } from 'src/entities/prenomina'
import { PositionEntity } from 'src/entities/recruiment'
import { UserEntity } from 'src/entities/user'
import { HOLIDAYS_DATA } from '../shared/data/holidays.data'

@Injectable()
export class PrenominaService {
  constructor (
    private readonly employeeService: EmployeeService,
    private readonly operationService: OperationService,
    private readonly prenominaConfigurationService: PrenominaConfigurationService,
    private readonly clientServiceService: ClientServiceService,
    private readonly positionService: PositionService,
    private readonly prenominaPeriodService: PrenominaPeriodService,
    private readonly prenominaPeriodEmployeeService: PrenominaPeriodEmployeeService,
    private readonly clientService: ClientService,
    private readonly prenominaPeriodEmployeeDayService: PrenominaPeriodEmployeeDayService) {}

  async getPrenomina (prenominaPeriodId: Types.ObjectId) {
    const prenominaPeriodEmployees: PrenominaPeriodEmployeeEntity[] = await this.getPrenominaPeriodEmployees(prenominaPeriodId)
    const prenominaPeriod: PrenominaPeriodEntity = await this.prenominaPeriodService.getById(prenominaPeriodId)
    const prenominaConfiguration: PrenominaConfigurationEntity = await this.prenominaConfigurationService.getById(prenominaPeriod.prenominaConfigurationId)
    const prenominaPeriodEmployeesExists = prenominaPeriodEmployees.filter(e => e.employeeId)
    const prenominaPeriodEmployeesIdsExists = prenominaPeriodEmployeesExists.map(e => new Types.ObjectId(e.id))
    const employeesIds = prenominaPeriodEmployeesExists.map(e => new Types.ObjectId(e.employeeId))
    const employees: EmployeeEntity[] = await this.employeeService.getByIds(employeesIds)
    const prenominaPeriodEmployeeDays: PrenominaPeriodEmployeeDayEntity[] = await this.prenominaPeriodEmployeeDayService.getWhereIn({ }, 'prenominaPeriodEmployeeId', prenominaPeriodEmployeesIdsExists)
    const dateDateTime: DateTime = DateTime.fromJSDate(new Date(prenominaPeriod.date))
    const days: DateTime[] = this.getDaysForPeriod(dateDateTime, prenominaConfiguration.billingPeriod)

    const headers = this.getPrenominaHeaders(dateDateTime, days)
    const rows = this.getPrenominaRows(prenominaPeriodEmployees, prenominaPeriodEmployeeDays, employees, days)
    return {
      headers,
      rows
    }
  }

  getPrenominaRows (prenominaPeriodEmployees: PrenominaPeriodEmployeeEntity[], prenominaPeriodEmployeeDays: PrenominaPeriodEmployeeDayEntity[], employees: EmployeeEntity[], days: DateTime[]) {
    const indexPrenominaPeriodEmployeeDays: any = {}

    prenominaPeriodEmployeeDays.forEach(
      (prenominaPeriodEmployeeDay: PrenominaPeriodEmployeeDayEntity) => {
        indexPrenominaPeriodEmployeeDays[
          String(prenominaPeriodEmployeeDay.prenominaPeriodEmployeeId) + DateTime.fromJSDate(new Date(prenominaPeriodEmployeeDay.date)).toFormat('D')
        ] = prenominaPeriodEmployeeDay
      })

    const result: any = []
    prenominaPeriodEmployees.forEach((vacancy: PrenominaPeriodEmployeeEntity) => {
      const employee = employees.find((employee: EmployeeEntity) => String(employee.id) === String(vacancy.employeeId))
      const employeeName: string = (employee && employee?.person?.name ? employee?.person?.name : '') + ' ' + (employee && employee?.person?.lastName ? employee?.person?.lastName : '')
      const newRow: any = {
        keycode: vacancy.keycode ? vacancy.keycode : '',
        bankAccount: vacancy.bankAccount ? vacancy.bankAccount : '',
        clientName: vacancy.clientName ? vacancy.clientName : '',
        employeeName,
        salary: vacancy.salary ? Number(vacancy.salary).toFixed(2) : '',
        absences: vacancy.absences ? Number(vacancy.absences).toFixed(2) : '',
        saving: vacancy.saving ? Number(vacancy.saving).toFixed(2) : '',
        uniforms: vacancy.uniforms ? Number(vacancy.uniforms).toFixed(2) : '',
        advance: vacancy.advance ? Number(vacancy.advance).toFixed(2) : '',
        double: vacancy.double ? Number(vacancy.double).toFixed(2) : '',
        bonus: vacancy.bonus ? Number(vacancy.bonus).toFixed(2) : '',
        holiday: vacancy.holiday ? Number(vacancy.holiday).toFixed(2) : '',
        infonavit: vacancy.infonavit ? Number(vacancy.infonavit).toFixed(2) : '',
        fonacot: vacancy.fonacot ? Number(vacancy.fonacot).toFixed(2) : '',
        loan: vacancy.loan ? Number(vacancy.loan).toFixed(2) : '',
        loanDeposit: vacancy.loanDeposit ? Number(vacancy.loanDeposit).toFixed(2) : '',
        nss: vacancy.nss ? Number(vacancy.nss).toFixed(2) : '',
        differenceWithoutImss: vacancy.total ? Number(vacancy.total).toFixed(2) : '',
        total: vacancy.total ? Number(vacancy.total).toFixed(2) : ''
      }
      
      // vacancy.differenceWithoutImss ? Number(vacancy.differenceWithoutImss).toFixed(2) : vacancy.total ? Number(vacancy.total).toFixed(2) : '',

      days.forEach((date: DateTime, index: number) => {
        const dateName = date.toFormat('D')
        const keyOfDay = vacancy.id + dateName
        if (indexPrenominaPeriodEmployeeDays[keyOfDay]) {
          newRow[dateName] = indexPrenominaPeriodEmployeeDays[keyOfDay].operationText
        }
      })
      result.push(newRow)
    })
    return result
  }

  getPrenominaHeaders (date: DateTime, days: DateTime[]) {
    const translate: any = {
      keycode: 'Clave',
      bankAccount: 'Cuenta',
      employeeName: 'Empleado',
      clientName: 'Cliente',
      salary: 'Salario',
      absences: 'Ausencias',
      saving: 'Ahorro',
      uniforms: 'Uniformes',
      advance: 'Anticipo',
      double: 'Dobles',
      bonus: 'Bonos',
      holiday: 'Festivos',
      infonavit: 'Infonavit',
      fonacot: 'Fonacot',
      loan: 'Prestamo',
      loanDeposit: 'Depósito (Prestamo)',
      nss: 'NSS',
      differenceWithoutImss: 'Bruto',
      total: 'Neto'
    }

    const result: string[] = [
      'keycode',
      'bankAccount',
      'clientName',
      'employeeName',
      'salary',
      'absences',
      'saving',
      'uniforms',
      'advance',
      'double',
      'bonus',
      'holiday',
      'infonavit',
      'fonacot',
      'loan',
      'loanDeposit',
      'nss',
      'differenceWithoutImss',
      'total'
    ]
    days.forEach((date: DateTime, index: number) => {
      const dateName = date.toFormat('D')
      result.splice(4 + index, 0, dateName)
    })

    return result.map((header: string) =>
      ({
        header: translate[header] ? translate[header] : header,
        key: header,
        width: ['clientName', 'employeeName'].includes(header) ? 30 : 10
      })
    )
  }

  capitalize (word: string) {
    const textArray = word.split('')
    textArray[0] = textArray[0].toUpperCase()
    return textArray.join('')
  }

  getDaysForPeriod (dayOfPeriod: DateTime, billingPeriod: string) {
    const plusDays = billingPeriod === 'weekly' ? 6 : billingPeriod === 'biweekly' ? (dayOfPeriod.day < 14 ? 14 : (dayOfPeriod.endOf('month').day - 16)) : dayOfPeriod.endOf('month').day - 1

    let startDate = dayOfPeriod
    const dates: DateTime[] = [startDate]
    Array.from(Array(plusDays).keys()).forEach(() => {
      startDate = startDate.plus({ days: 1 })
      dates.push(startDate)
    })
    return dates
  }

  async generate (prenominaPeriod: PrenominaPeriodEntity, user: UserEntity) {
    const prenominaConfiguration: PrenominaConfigurationEntity = await this.prenominaConfigurationService.getById(prenominaPeriod.prenominaConfigurationId)
    const clientServices = await this.clientServiceService.getWhereIn({ }, 'clientId', prenominaConfiguration.clientsIds) 
    let employees: EmployeeEntity[] = await this.getPeriodClientServiceEmployees(prenominaConfiguration.billingPeriod, clientServices)

    employees = employees.filter(e => e.person.name !== 'Vacante')
    const { billingPeriod } = prenominaConfiguration

    const dayOfPeriod: DateTime = DateTime.fromJSDate(prenominaPeriod.date)
    const plusDays = billingPeriod === 'weekly' ? 6 : billingPeriod === 'biweekly' ? (dayOfPeriod.day < 14 ? 14 : (dayOfPeriod.endOf('month').day - 16)) : dayOfPeriod.endOf('month').day - 1

    let startDate = dayOfPeriod
    const dates: DateTime[] = [startDate]
    Array.from(Array(plusDays).keys()).forEach(() => {
      startDate = startDate.plus({ days: 1 })
      dates.push(startDate)
    })


    const operations: OperationEntity[] = await this.getOperations(dates, employees)
    const positions: PositionEntity[] = await this.positionService.getWhereIn({ }, 'clientId', prenominaConfiguration.clientsIds)
    const prenominaPeriodEmployeesToInsert: PrenominaPeriodEmployeeEntity[] = this.generatePrenominaPeriodEmployees(prenominaConfiguration, prenominaPeriod, employees, operations, positions)
    if (prenominaPeriodEmployeesToInsert && prenominaPeriodEmployeesToInsert.length > 0) {
      const prenominaPeriodEmployeesPromises = prenominaPeriodEmployeesToInsert.map(
        (prenominaPeriodEmployee: PrenominaPeriodEmployeeEntity) => this.prenominaPeriodEmployeeService.create({ ...prenominaPeriodEmployee, createdBy: user.id })
      )
      const prenominaPeriodEmployees: PrenominaPeriodEmployeeEntity[] = await Promise.all(prenominaPeriodEmployeesPromises)

      const prenominaPeriodEmployeeDays: PrenominaPeriodEmployeeDayEntity[] = []

      prenominaPeriodEmployees.forEach((prenominaPeriodEmployee: PrenominaPeriodEmployeeEntity) => {
        dates.forEach((date: DateTime) => {
          const operationsEmployee = operations.filter(operation => String(operation.employeeId) === String(prenominaPeriodEmployee.employeeId))
          const operation: OperationEntity = operationsEmployee.find((operation: OperationEntity) => {
            const operationDate = DateTime.fromJSDate(new Date(operation.date))
            return operationDate.equals(date)
          })
          prenominaPeriodEmployeeDays.push({
            prenominaPeriodEmployeeId: prenominaPeriodEmployee.id,
            date: date.toJSDate(),
            operationText: operation ? operation.operationConfirm : '',
            operationAbbreviation: operation ? operation.operationConfirm : '',
            operationComments: operation ? operation.operationComments : '',
            operationConfirmComments: operation ? operation.operationConfirmComments : '',
            operationHours: operation ? operation.operationHours : null,
            operationConfirmHours: operation ? operation.operationConfirmHours : null,
            createdAt: new Date(),
            createdBy: user.id
          })
        })
      })

      const prenominaPeriodEmployeeDaysPromises: Promise<PrenominaPeriodEmployeeDayEntity>[] = prenominaPeriodEmployeeDays.map(item => this.prenominaPeriodEmployeeDayService.create(item))
      await Promise.all(prenominaPeriodEmployeeDaysPromises)
    }
  }

  async getPrenominaPeriodEmployees (prenominaPeriodId: any): Promise<PrenominaPeriodEmployeeEntity[]> {
    return this.prenominaPeriodEmployeeService.get({
      prenominaPeriodId
    })
  }

  async getPrenominaPeriodEmployeeDays (prenominaPeriodEmployeeId: any): Promise<PrenominaPeriodEmployeeDayEntity[]> {
    return this.prenominaPeriodEmployeeDayService.get({
      prenominaPeriodEmployeeId
    })
  }

  async getPeriodClientServiceEmployees (billingPeriod: string, clientServices: ClientServiceEntity[]) {
    // const clientServicesFiltered = clientServices.filter((clientService: ClientServiceEntity) => clientService.billing === billingPeriod)
    const clientServicesIds = clientServices.map(clientServiceFiltered => String(clientServiceFiltered.id))
    const clientsIds = clientServices.map(clientServiceFiltered => String(clientServiceFiltered.clientId))
    // const allPromises = []
    // clientServices.forEach(clientService => {
    //   allPromises.push(this.employeeService.get({ clientServiceId: clientService.id }))
    // })
    const clients: ClientEntity[] = await this.clientService.getWhereIn({ }, 'id', clientsIds)
    let employees: any[] = await this.employeeService.getWhereIn({ }, 'clientServiceId', clientServicesIds) as any[]
   
    
    employees = employees.map(employee => {
      const copy = JSON.parse(JSON.stringify(employee))
      copy.id = new Types.ObjectId(copy['_id'])
      const clientService: ClientServiceEntity = clientServices.find(clientService => String(clientService.id) === String(employee.clientServiceId))
      const client = clients.find(client => String(client.id) === String(clientService.clientId))


      copy.businessName = client.businessName
      copy.businessReason = client.businessReason
      copy.clientServiceName = clientService.name

  
      return copy
    })


    return employees
  }

  async getOperations (dates: DateTime[], employees: EmployeeEntity[]): Promise<OperationEntity[]> {
    const operationPromises = []
    employees.forEach((employee: any) => {
      dates.forEach(date => {
        operationPromises.push(this.operationService.getOne({ employeeId: employee.id, date: date.toJSDate() }))
      })
    })
    const operations = await Promise.all(operationPromises)
    const filteredNotNulls = operations.filter(operation => !!operation)
    return filteredNotNulls
  }

  getPeriodMultiplicator (billingPeriod: string, startDate: Date) {
    const dayOfPeriod: DateTime = DateTime.fromJSDate(startDate)
    return billingPeriod === 'weekly' ? 7 : billingPeriod === 'biweekly' ? (dayOfPeriod.day < 15 ? 15 : (dayOfPeriod.endOf('month').day - 15)) : dayOfPeriod.endOf('month').day
  }

  isHoliday (date: Date) {
    const datetimeDate = DateTime.fromJSDate(new Date(date))
    return HOLIDAYS_DATA.find(hd => {
      const dateTimeHd = DateTime.fromJSDate(hd)
      return datetimeDate.day === dateTimeHd.day && datetimeDate.month === dateTimeHd.month
    })
  }

  generatePrenominaPeriodEmployees (prenominaConfiguration: PrenominaConfigurationEntity,
    prenominaPeriod: PrenominaPeriodEntity,
    employees: EmployeeEntity[],
    operations: OperationEntity[],
    positions: PositionEntity[]) {

    const prenominaPeriodEmployees: PrenominaPeriodEmployeeEntity[] = []
    const { totalVacancies, id } = prenominaPeriod

    totalVacancies.forEach((vancancy: PrenomionaPeriodVacanciesConfigurationEntity, index: number) => {
      let position = null
      let multiplicator = null
      let totalAbscences = 0
      let total = 0
      let salary = 0
      let absences = 0
      let bonus = 0
      let double = 0

      const employee = this.removeFirstMatchingEmployee(employees, vancancy)
      
      if (employee) {
        position = positions.find((position: PositionEntity) => String(position.id) === String(employee.positionId))

        multiplicator = this.getPeriodMultiplicator(prenominaConfiguration.billingPeriod, prenominaPeriod.date)
        const abscencesForBonus = operations.filter((operation: OperationEntity) => operation.operationConfirm === 'F' && String(operation.employeeId) === String(employee.id))
        const extrasDays = operations.filter((operation: OperationEntity) => operation.operationConfirmHours && String(operation.employeeId) === String(employee.id))

        const hourSalary = (position && position.salary ? position.salary : 0) / (position && position.hoursPerShift ? position.hoursPerShift : 8)
        bonus = position && position.bonus ? position.bonus : 500
  
        if (extrasDays.length > 0) {
          const hoursExtra = extrasDays.map(e => e.operationConfirmHours)
          const totalHours = hoursExtra.reduce((accumulator: number, item: number) => accumulator + item)
          double = hourSalary * totalHours
        }

        const operationsFilteredForAbscences = abscencesForBonus.filter((operation: OperationEntity) => !this.isHoliday(operation.date))
        totalAbscences = operationsFilteredForAbscences.length || 0
        if (abscencesForBonus && abscencesForBonus.length >= 1) {
          bonus = 0
        }

        
        salary = position && position.salary ? position.salary * multiplicator : 0
        absences = position && position.salary ? position.salary * totalAbscences : 0
        total = salary - absences
        total += bonus
        total += double
      }

      const newPrenominaPeriodEmployee: PrenominaPeriodEmployeeEntity = {
        employeeId: employee && employee._id ? new Types.ObjectId(employee._id) : null,
        prenominaPeriodId:  new Types.ObjectId(id),
        keycode: employee && employee.keycode ? employee.keycode : null,
        bankAccount: employee && employee.bankAccount ? employee.bankAccount : null,
        clientName: vancancy.clientName ? vancancy.clientName : 'N/A',
        salary,
        absences,
        saving: 0,
        uniforms: 0,
        advance: 0,
        double,
        bonus,
        holiday: 0,
        infonavit: 0,
        fonacot: 0,
        loan: 0,
        nss: 0,
        loanDeposit: 0,
        differenceWithoutImss: total,
        total,
        createdAt: new Date(),
        createdBy: null
      }

      prenominaPeriodEmployees.push(newPrenominaPeriodEmployee)
    })
    return prenominaPeriodEmployees
  }

  removeFirstMatchingEmployee (employees, vacancy) {
    const index = employees.findIndex(employee =>
      employee.businessName === vacancy.clientName &&
      employee.clientServiceName === vacancy.clientServiceName
    )

    if (index !== -1) {
      const removedEmployee = employees.splice(index, 1)[0]
      return removedEmployee
    }

    return null
  }
}
