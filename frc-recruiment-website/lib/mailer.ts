import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
})

export async function sendConfirmationEmail(
  to: string,
  refCode: string,
  fullName: string,
  clubName: string
): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log('SMTP not configured, skipping email send. Ref code:', refCode)
    return
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || 'FRC <no-reply@frc-fptu.club>',
    to,
    subject: `Xác nhận đăng ký thành viên ${clubName} - Mã đăng ký: ${refCode}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .ref-code { background: #fff; border: 2px dashed #667eea; padding: 15px; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Đăng ký thành công!</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${fullName}</strong>,</p>
              <p>Cảm ơn bạn đã đăng ký tham gia <strong>${clubName}</strong>!</p>
              <p>Mã đăng ký của bạn là:</p>
              <div class="ref-code">${refCode}</div>
              <p>Vui lòng lưu lại mã này để tham khảo sau. Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
              <p>Trân trọng,<br>Ban Tổ chức ${clubName}</p>
            </div>
            <div class="footer">
              <p>Email này được gửi tự động, vui lòng không trả lời.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Xin chào ${fullName},

Cảm ơn bạn đã đăng ký tham gia ${clubName}!

Mã đăng ký của bạn là: ${refCode}

Vui lòng lưu lại mã này để tham khảo sau. Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất.

Trân trọng,
Ban Tổ chức ${clubName}
    `.trim(),
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Confirmation email sent to ${to} with ref code ${refCode}`)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

