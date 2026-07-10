export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  INQUIRY_CONFIRMATION: 'inquiry-confirmation',
  PASSWORD_RESET: 'password-reset',
  BOOKING_CONFIRMATION: 'booking-confirmation',
}

export const EMAIL_FROM = {
  NAME: 'Elite Motors',
  ADDRESS: 'noreply@elitemotors.com',
}

export function getEmailTemplate(type) {
  const templates = {
    [EMAIL_TEMPLATES.WELCOME]: {
      subject: 'Welcome to Elite Motors',
      body: `Dear {name},\n\nWelcome to Elite Motors! We're excited to have you join our community of luxury car enthusiasts.\n\nBest regards,\nThe Elite Motors Team`,
    },
    [EMAIL_TEMPLATES.INQUIRY_CONFIRMATION]: {
      subject: 'Inquiry Received - Elite Motors',
      body: `Dear {name},\n\nThank you for your inquiry about {carModel}. Our specialist will contact you within 24 hours.\n\nBest regards,\nThe Elite Motors Team`,
    },
    [EMAIL_TEMPLATES.PASSWORD_RESET]: {
      subject: 'Password Reset - Elite Motors',
      body: `Dear {name},\n\nClick the following link to reset your password: {resetLink}\n\nThis link will expire in 1 hour.\n\nBest regards,\nThe Elite Motors Team`,
    },
    [EMAIL_TEMPLATES.BOOKING_CONFIRMATION]: {
      subject: 'Booking Confirmed - Elite Motors',
      body: `Dear {name},\n\nYour booking for {carModel} on {date} at {time} has been confirmed.\n\nReference: {referenceId}\n\nBest regards,\nThe Elite Motors Team`,
    },
  }

  return templates[type] || null
}

export function personalizeTemplate(template, data) {
  let subject = template.subject
  let body = template.body

  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g')
    subject = subject.replace(regex, value || '')
    body = body.replace(regex, value || '')
  })

  return { subject, body }
}
