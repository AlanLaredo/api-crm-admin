/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import { Types } from 'mongoose'
import { ClientServiceService } from 'src/database/mongoose/services/client'
import { EmployeeService, OperationService } from 'src/database/mongoose/services/employee'
import { PrenominaConfigurationService, PrenominaPeriodEmployeeDayService, PrenominaPeriodEmployeeService, PrenominaPeriodService } from 'src/database/mongoose/services/prenomina'
import { PositionService } from 'src/database/mongoose/services/recruiment'
import { Workbook } from 'exceljs'
import { PrenominaPeriodEmployeeEntity, PrenominaPeriodEntity } from 'src/entities/prenomina'


@Injectable()
export class PrenominaImportService {
  constructor (
    private readonly employeeService: EmployeeService,
    private readonly operationService: OperationService,
    private readonly prenominaConfigurationService: PrenominaConfigurationService,
    private readonly clientServiceService: ClientServiceService,
    private readonly positionService: PositionService,
    private readonly prenominaPeriodService: PrenominaPeriodService,
    private readonly prenominaPeriodEmployeeService: PrenominaPeriodEmployeeService,
    private readonly prenominaPeriodEmployeeDayService: PrenominaPeriodEmployeeDayService) {}

  async importFile (prenominaPeriodId: string, filePath: any) {

    // 1 READ EXCEL
    // const filePath = 'C:\\Users\\RyzenPc\\Downloads\\Libro1.xlsx'
    // const fileContent = await this.fileService.readFile(filePath)

    const workbook = new Workbook()

    await workbook.xlsx.readFile(filePath)

    // 2 PROCESS EXCEL DATA TO NODE
    const worksheet = workbook.getWorksheet(1)

    let rows = []
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return
      const newRow = {}
      row.eachCell((cell, cellIndex) => {
        const propName = this.getProp(cellIndex)
        if (propName) {
          newRow[propName] = cell.value
        }
      })
      rows.push(newRow)
    })

    // 3 PARSE, CLEAN AND FILTER ROWS
    rows = rows.map(row => this.cleanAndParseRowsForPrenomina(row)).filter(row => row)

    // 4 REMOVE ALL DUPLICATES
    const dataImport = this.removeAllDuplicatesByKeycode(rows)
    const employeesKeycode = dataImport.map(row => row.keycode)

    // 5 VALIDA PRENOMINA Y EMPLEADOS
    const prenominaPeriod: PrenominaPeriodEntity = await this.prenominaPeriodService.getById(new Types.ObjectId(prenominaPeriodId))
    if (!prenominaPeriod) {
      throw new Error('No existe la prenómina')
    }

    const prenominaPeriodEmployees: PrenominaPeriodEmployeeEntity[] = await this.prenominaPeriodEmployeeService.getWhereIn({ prenominaPeriodId: prenominaPeriod.id }, 'keycode', employeesKeycode)
  
    // 6 RECORRE LOS EXISTENTES Y ASIGNA LOS VALORES
    const saveObjectsPromises = prenominaPeriodEmployees.map(
      ppE => {
        const foundDataForImport = dataImport.find(dI => String(dI.keycode) === String(ppE.keycode))
        let total = (ppE.salary || 0) + (ppE.advance || 0) + (ppE.double || 0) + (ppE.bonus || 0) + (ppE.holiday || 0) - (ppE.saving || 0) - (ppE.absences || 0)

        dataImport.infonavit || (dataImport.infonavit !== null && dataImport.infonavit !== undefined && dataImport.infonavit === 0) ? total = total - dataImport.infonavit : total = total - (ppE.infonavit || 0)
        dataImport.fonacot || (dataImport.fonacot !== null && dataImport.fonacot !== undefined && dataImport.fonacot === 0) ? total = total - dataImport.fonacot : total = total - (ppE.fonacot || 0)
        dataImport.loan || (dataImport.loan !== null && dataImport.loan !== undefined && dataImport.loan === 0) ? total = total - dataImport.loan : total = total - (ppE.loan || 0)
        dataImport.nss || (dataImport.nss !== null && dataImport.nss !== undefined && dataImport.nss === 0) ? total = total - dataImport.nss : total = total - (ppE.nss || 0)
        dataImport.uniforms || (dataImport.uniforms !== null && dataImport.uniforms !== undefined && dataImport.uniforms === 0) ? total = total - dataImport.uniforms : total = total - (ppE.uniforms || 0)


        return this.prenominaPeriodEmployeeService.update(ppE.id, { ...foundDataForImport, total })
      }
    )

    // 7 GUARDA
    return await Promise.all(saveObjectsPromises)
  }

  isNumeric (value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }
  
  cleanAndParseRowsForPrenomina (row) {
    if (!row.keycode || (row.keycode && String(row.keycode).trim() === '')) {
      return null
    }
  
    const cleanedRow = {}
    let hasValidValues = false
  
    for (const prop of this.IMPORT_PROPS) {
      if (row.hasOwnProperty(prop)) {
        const value = row[prop]
  
        if (this.isNumeric(value) || prop === 'keycode') {
          if (prop === 'keycode') {
            cleanedRow[prop] = String(value)
          } else {
            cleanedRow[prop] = parseFloat(value)
          }
          hasValidValues = true
        } else {
          delete cleanedRow[prop]
        }
      }
    }
  
    return hasValidValues && Object.keys(cleanedRow).length >= 2 ? cleanedRow : null
  }
  

 
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IMPORT_PROPS = [
    'keycode',
    'fonacot',
    'infonavit',
    'nss',
    'loan',
    'uniforms']
  getProp (propIndex: number) {
    return this.IMPORT_PROPS[propIndex-1] || null
  }

  removeAllDuplicatesByKeycode (arr) {
    const keycodeCounts = {}

    // Contar las apariciones de cada keycode
    arr.forEach(item => {
      if (keycodeCounts[item.keycode]) {
        keycodeCounts[item.keycode]++
      } else {
        keycodeCounts[item.keycode] = 1
      }
    })
  
    // Filtrar los elementos basándose en el conteo de keycode
    return arr.filter(item => keycodeCounts[item.keycode] === 1)
  }
}
