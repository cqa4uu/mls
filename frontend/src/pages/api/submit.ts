import type { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import nodemailer, { TransportOptions } from 'nodemailer';


const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const secure = process.env.MAIL_SECURE;
const recipient = process.env.MAIL_RECIPIENT;

interface FormData {
    [key: string]: string;
}

interface FormFieldConfig {
    fieldName: string;
    validation: z.ZodType<any, any, any>;
}

interface FormConfig {
    fields: FormFieldConfig[];
    emailSubject: string;
}

const formConfigs: Record<string, FormConfig> = {
    callback: {
        fields: [
            { fieldName: 'name', validation: z.string().min(2).max(50), },
            { fieldName: 'phone', validation: z.string().min(4).max(50) },
            { fieldName: 'question', validation: z.string().min(2).max(1000) },
        ],
        emailSubject: 'Обратный звонок',
    },
    review: {
        fields: [
            { fieldName: 'name', validation: z.string().min(2).max(50) },
            { fieldName: 'review', validation: z.string().min(2).max(1000) },
        ],
        emailSubject: 'Отзыв',
    },
    // ather forms
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { formType } = req.body;

    try {
        const formConfig = formConfigs[formType];
        if (!formConfig) {
            throw new Error('Неверный тип формы');
        }

        const data: FormData = {};

        for (const fieldConfig of formConfig.fields) {
            const { fieldName, validation } = fieldConfig;
            data[fieldName] = validation.parse(req.body[fieldName]);
        }

        await sendEmail(data, formConfig);
        res.status(200).json({ success: true });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            res.status(400).json({
                success: false,
                errors: {
                    code: 'FORM_VALIDATION_ERROR',
                    // details: error.errors,
                },
            });
        } else {
            res.status(500).json({
                success: false,
                errors: {
                    code: 'INTERNAL_SERVER_ERROR',
                },
            });
        }
    }
}

async function sendEmail(data: FormData, config: FormConfig) {
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        auth: {
            user: user,
            pass: pass,
        },
        secure: secure,
    } as TransportOptions);

    const mailOptions = {
        from: user,
        to: recipient,
        subject: config.emailSubject,
        html: `
        <p>
        ${Object.keys(data).map(fieldName => `${fieldName}: ${data[fieldName]} <br />`).join('')}
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);
}
