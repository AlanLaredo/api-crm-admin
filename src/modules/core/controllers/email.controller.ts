import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { DateTime } from 'luxon'
import { Types } from 'mongoose'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'

@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
  /* eslint-disable no-useless-constructor */
  constructor (
    private readonly mailerService: MailerService) { }

  @Post('test')
  async test (@Body() payload: any) {
    return false
  }

  async send (emailTo: string, emailFrom: string, subject: string, templateName: string, context: any): Promise<any> {
    return this.mailerService
      .sendMail({
        from: emailFrom,
        to: emailTo,
        subject,
        template: templateName,
        context
      })
  }
}
