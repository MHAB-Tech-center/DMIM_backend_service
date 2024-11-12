import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { footerHTML, headerHTML } from 'src/utils/appData/constants';

@Injectable()
export class MailingService {
  private options;
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(
    link: string,
    type: string,
    name: string,
    user: Profile,
    data?: any,
    email?: string,
    inspectionDate?: string
  ) {
    const frontendUrl = "http://dmis.rmb.gov.rw:5173/";
    const recipient = await user;
    switch (type) {
      case 'get-code':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'DMIM Verification code',
          html: `${headerHTML}
       </div>
        <div class='content'>
          <p>Hello ${name}, Welcome to DMIM </p>
          <p>Thank you for using digital inspection manual</p>
          <p>Below is verification code</p>
           <a href="[Profile Setup Link]" class="btn">${recipient.activationCode}</a>
        </div>
            ${footerHTML}  
            `,
        };
        break;
      case 'verify-email':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'DMIM Email verification',
          html: `${headerHTML}
        </div>
        <div class='content'>
          <p>Hello ${name}, Welcome to DMIM </p>
          <p>Thank you for signing up! Please click the button below to verify your account :</p>
          <p>Or use Your verification code</p>
           <a href="[Profile Setup Link]" class="btn">${recipient.activationCode}</a>
          <p> You can also verify your account by click on this link <a class='button' href='${frontendUrl}${link}'>Reset your password</a>
        </div>
          ${footerHTML}  
          `,
        };
        break;
      case 'verify-email-login':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'DMIM Login Email verification',
          html: `${headerHTML}
        </div>
        <div class='content'>
          <p>Hello ${name}, Welcome to DMIM </p>
          <p>Thank you for logging in!</p>
          <p>Bellow is your verification code</p>
          <a href="[Profile Setup Link]" class="btn">${recipient.activationCode}</a>
          <p> You can also verify your account by click on this link <a class='button' href='${link}'>Reset your password</a>
        </div>
          ${footerHTML}  
          `,
        };
        break;
      case 'invite-rmb':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'DMIM RMB Staff Invitation',
          html: `${headerHTML}
       <div class="content">
          <p>Dear ${name},</p>
          <p>Welcome to the RMB team! Set up your profile to access your account and manage your responsibilities within the app.</p>
                <a href="${frontendUrl}${link}" style="display: inline-block; padding: 10px 15px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Set Up Profile</a>
          <p>We are glad to have you with us!</p>
          <p>Best regards,<br>The RMB Team</p>
       </div>
  
          ${footerHTML}  
          `,
        };
        break;
      case 'invite-inspector':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'DMIM Inspector Invitation',
          html: `${headerHTML}
        <h1>Action Required</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We are thrilled to welcome you to our Digital Mine Inspection Manual  platform. To start using the app, please set up your
                profile.</p>
                <a href="${frontendUrl}${link}" style="display: inline-block; padding: 10px 15px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Set Up Profile</a>
        <p>We are glad to have you with us!</p>
          <p>Best regards,<br>The RMB Team</p>
        </div>
          ${footerHTML}  
          `,
        };
        break;
      case 'invite-miner':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'DMIM Miner Invitation',
          html: `${headerHTML}
           <h1>Action Required</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We are thrilled to welcome you to our Digital Mine Inspection Manual  platform. To start using the app, please set up your
                profile.</p>
            <a href="${frontendUrl}${link}" class="btn">Set Up Profile</a>
           <p>We are glad to have you with us!</p>
          <p>Best regards,<br>The RMB Team</p>
        </div>
          ${footerHTML}  
          `,
        };
        break;
      case 'reject':
        this.options = {
          transporterName: null,
          to: recipient.email,
          subject: 'Inspection report Rejected',
          html: `${headerHTML}
           <div class="content">
              <p>Dear ${name},</p>
              <p>We wanted to inform the incpection report you submitted on ${inspectionDate} has been rejected by RMB Staff in charge</p>
              <p>If you have any questions, please do not hesitate to contact us.</p>
              <p>Best regards,<br>The RMB Team</p>
           </div>
  
            ${footerHTML}  
            `,
        };
        break;
        case 'approve':
          this.options = {
            transporterName: null,
            to: recipient.email,
            subject: 'Inspection report Approved',
            html: `${headerHTML}
             <div class="content">
                <p>Dear ${name},</p>
                <p>We wanted to inform the incpection report you submitted on ${inspectionDate} has been approved by RMB Staff in charge</p>
                <p>If you have any questions, please do not hesitate to contact us.</p>
                <p>Best regards,<br>The RMB Team</p>
             </div>
    
              ${footerHTML}  
              `,
          };
          break;
      case 'review':
        this.options = {
          transporterName: null,
          to: email,
          subject: 'Inspection Reviewed by RMB',
          html: `${headerHTML}
         <div class="content">
            <p>Dear ${name},</p>
            <p>We just wanted to let you know that your inspection has been reviewed with the following reviews:</p>
            <ul>
                <pre>${data}</pre>
            </ul>
            <p>If you have any questions, please do not hesitate to contact us.</p>
            <p>Best regards,<br>The RMB Team</p>
         </div>

          ${footerHTML}  
          `,
        };
        break;
      default:
        throw new Error('Provide valid email type');
    }
    try {
      await this.mailService.sendMail(this.options);
      console.log("Email sent")
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
