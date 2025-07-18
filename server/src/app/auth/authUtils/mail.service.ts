import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    public emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.getOrThrow<string>('SMTP_HOST'),
            port: this.configService.getOrThrow<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.getOrThrow<string>('SMTP_USER'),
                pass: this.configService.getOrThrow<string>('SMTP_PASSWORD')
            }
        })
        return transporter
    }

    public async sendActivationMail(to: string, link: string): Promise<void> {
        const transporter = this.emailTransport()

        const options: nodemailer.SendMailOptions = {
            from: this.configService.getOrThrow('SMTP_USER'),
            to,
            subject: 'Активация аккаунта на ' + this.configService.getOrThrow<string>('SERVER_URL'),
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <h3>Если это были не вы, игнорируйте данное письмо!</h3>
                        <a href="${link}">${link}</a>
                    </div>
                    `
        }

        try {
            await transporter.sendMail(options)
        } catch (err) {
            console.error(err)
        }
    }
}