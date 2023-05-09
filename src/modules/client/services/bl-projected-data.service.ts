import { Injectable } from '@nestjs/common'
import { ProjectedDataEntity, ProjectedPeriodEntity } from 'src/entities/client'
import * as fs from 'fs'

import { DateTime } from 'luxon'
import { ConfigService } from '@nestjs/config'
import { ProjectedDataService, ProjectedPeriodService } from 'src/database/mongoose/services/client'

@Injectable()
export class BlProjectedDataService {
  /* eslint-disable no-useless-constructor */
  constructor (
    private readonly configService: ConfigService,
    private readonly projectedPeriodService: ProjectedPeriodService,
    private readonly projectedDataService: ProjectedDataService
  ) { }

  async syncAll () {
    const projectedPeriods: ProjectedPeriodEntity[] = await this.projectedPeriodService.get()
    return Promise.all(projectedPeriods.map(
      (projectedPeriod: ProjectedPeriodEntity) => this.sync(projectedPeriod.id)
    ))
  }

  async sync (projectedPeriodId: any) {
    const projectedDatas: ProjectedDataEntity[] = await this.projectedDataService.get({ projectedPeriodId })
    const updateProjectedData: ProjectedDataEntity[] = await this.searchProjectedDataInFiles(projectedDatas)
    return Promise.all(updateProjectedData.map(
      (projectedData: ProjectedDataEntity) => this.projectedDataService.update(projectedData.id, { invoiceName: 'Facturado' })
    ))
  }

  async searchProjectedDataInFiles (projectedDatas: ProjectedDataEntity[]) {
    const structuredInvoices = await this.getExistingInvoices()
    return projectedDatas.filter(
      (projectedData: ProjectedDataEntity) =>
        structuredInvoices.find((structuredInvoice: any) => {
          const fileDate: DateTime = DateTime.fromJSDate(new Date(projectedData.startDate))
          const projectedDataDate: DateTime = DateTime.fromJSDate(new Date(structuredInvoice.date))
          return (
            String(structuredInvoice.clientCode) === String(projectedData.clientKeycode) &&
            String(structuredInvoice.clientServiceCode) === String(projectedData.clientServiceKeycode) &&
            fileDate.equals(projectedDataDate) &&
            String(structuredInvoice.totalFactura) === String(projectedData.invoiceTotal)
          )
        })
    )
  }

  async getExistingInvoices () {
    const files = await this.GetFileList()
    const structuredInvoices = []
    files.forEach((file: string) => {
      if (file.split('-').length === 6) {
        const [currentName, clientCode, clientServiceCode, date, totalFactura, periodWithExt] = file.split('-')
        const [period, ext] = periodWithExt.split('.')
        structuredInvoices.push({
          currentName, clientCode, clientServiceCode, date, totalFactura, period, ext
        })
      }
    })

    return structuredInvoices.map((invoice: any) => {
      const day = invoice.date.slice(0, 2)
      const month = invoice.date.slice(2, 4)
      const year = Number(invoice.date.slice(4)) + 2000
      const date = DateTime.now().set({ year, month, day }).startOf('day')
      invoice.date = date.toJSDate()
      return invoice
    })
  }

  async GetFileList (): Promise<string[]> {
    return new Promise(
      (resolve, reject) => {
        // const dir = 'C:\\Users\\santi\\Downloads\\facturasCRM'
        const dir: string = this.configService.get<string>('config.system.billingPath')
        fs.readdir(dir, function (err, filenames) {
          if (err) {
            reject(err)
          } else {
            resolve(filenames)
          }
        })
      }
    )
  }
}
