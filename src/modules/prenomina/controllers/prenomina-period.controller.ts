/* eslint-disable no-useless-constructor */

import { Controller, Res } from '@nestjs/common'
import { PrenominaPeriodService } from 'src/database/mongoose/services/prenomina'

import { Workbook } from 'exceljs'
import { Response } from 'express'

import { Get, Param } from '@nestjs/common/decorators'
import { PrenominaService } from '../services'
import { Types } from 'mongoose'

@Controller('prenomina')
export class PrenominaPeriodController {
  constructor (
    private readonly prenominaPeriodService: PrenominaPeriodService,
    private readonly prenominaService: PrenominaService) {
  }

  @Get('/generate/:prenominaPeriodId')
  async descargarArchivoExcel (
    @Param('prenominaPeriodId') prenominaPeriodId: string,
    @Res() res: Response) {
    const prenominaPeriod = await this.prenominaPeriodService.getById(new Types.ObjectId(prenominaPeriodId))
    if (!prenominaPeriod) {
      return 'No se encontró la prenómina: ' + prenominaPeriodId
    }
    const prenomina: any = await this.prenominaService.getPrenomina(prenominaPeriod.id)

    const buffer = await this.generateExcel(prenominaPeriod.name, prenomina)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=' + prenominaPeriod.name + '.xlsx')
    res.send(buffer)
    res.end()
  }

  async generateExcel (name: string, data: any): Promise<any> {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Prenómina')
    worksheet.columns = data.headers
    /*
    [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Email', key: 'email', width: 32 }
    ]
    */

    data.rows.forEach((row) => {
      worksheet.addRow({ ...row })
    })

    // worksheet.addRow({ id: 1, name: 'John Doe', email: 'johndoe@example.com' })
    // worksheet.addRow({ id: 2, name: 'Jane Doe', email: 'janedoe@example.com' })
    return workbook.xlsx.writeBuffer()
  }
}
