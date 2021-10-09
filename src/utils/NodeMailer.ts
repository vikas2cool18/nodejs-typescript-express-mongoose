import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer {
    private static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }

    static sendEmail(data: { to: [string], subject: string, html: string }): Promise<any> {
        return NodeMailer.initializeTransport().sendMail({
            from: 'abc@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}
