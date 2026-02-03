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


export async function sendInterviewConfirmationEmail(
  to: string,
  fullName: string,
  slotStartTime: Date,
  slotEndTime: Date,
  clubName: string
): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log('SMTP not configured, skipping interview email send. Email:', to)
    return
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh'
    }).format(date)
  }

  const timeString = `${formatDate(slotStartTime)} - ${new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(slotEndTime)}`

  const mailOptions = {
    from: process.env.SMTP_FROM || 'FRC <no-reply@frc-fptu.club>',
    to,
    subject: `Xác nhận lịch phỏng vấn ${clubName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; }
            .slot-info { background: #fff; border: 2px solid #3b82f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .time { font-size: 20px; font-weight: bold; color: #2563eb; }
            .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Xác Nhận Lịch Phỏng Vấn</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${fullName}</strong>,</p>
              <p>Chúc mừng bạn đã hoàn thành vòng đăng ký! Chúng mình rất mong chờ được gặp bạn tại buổi phỏng vấn của <strong>${clubName}</strong>.</p>
              <p>Thông tin lịch phỏng vấn của bạn:</p>
              <div class="slot-info">
                <div class="time">${timeString}</div>
                <p style="margin-top: 10px; color: #64748b;">Địa điểm: Phòng Lab FRC (Tòa Gamma, ĐH FPT Hà Nội)</p>
              </div>
              <p>Vui lòng đến đúng giờ và chuẩn bị tinh thần thoải mái nhất nhé. Nếu có thay đổi đột xuất, hãy nhắn tin ngay cho fanpage của CLB.</p>
              <p>Hẹn gặp lại bạn!</p>
              <p>Trân trọng,<br>Ban Tuyển Thành Viên ${clubName}</p>
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

Chúc mừng bạn đã hoàn thành vòng đăng ký! Chúng mình rất mong chờ được gặp bạn tại buổi phỏng vấn của ${clubName}.

Thông tin lịch phỏng vấn của bạn:
Thời gian: ${timeString}
Địa điểm: Phòng Lab FRC (Tòa Gamma, ĐH FPT Hà Nội)

Vui lòng đến đúng giờ và chuẩn bị tinh thần thoải mái nhất nhé.

Trân trọng,
Ban Tuyển Thành Viên ${clubName}
    `.trim(),
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Interview confirmation email sent to ${to}`)
  } catch (error) {
    console.error('Error sending interview email:', error)
    throw error
  }
}
