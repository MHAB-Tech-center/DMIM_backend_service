import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { footerHTML, headerHTML } from 'src/utils/appData/constants';

@Injectable()
export class MailingService {
  private options;
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  async sendEmail(link: string, reset: boolean, user: any) {
    const recipient = await user;
    try {
      if (reset) {
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'KabStore password reset',
          html: `${headerHTML}
          </div>
          <div class='content'>
            <p>Hello ${recipient.lastName}
            <p>Your verification code is  ${recipient.activationCode}</p>
            <p> You can also verify your account by click on this link <a class='button' href='${link}'>Verify Email</a>
          </div>
            ${footerHTML}  
            `,
        };
      } else {
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'Kabstore Email verification',
          html: `${headerHTML}
        </div>
        <div class='content'>
          <p>Hello ${recipient.lastName}, Welcome to Kabstore </p>
          <p>Thank you for signing up! Please click the button below to reset  your password :</p>
          <p>Your verification code is  ${recipient.activationCode}</p>
          <p> You can also verify your account by click on this link <a class='button' href='${link}'>Reset your password</a>
        </div>
          ${footerHTML}  
          `,
        };
      }
      await this.mailService.sendMail(this.options);
    } catch (error) {
      console.log(error);
    }
  }
  async sendNotificationEmail(
    to: string,
    name: string,
    message: string,
    link: string,
  ) {}
}
