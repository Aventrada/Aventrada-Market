import { formatDate } from "./utils"

type EmailTemplateProps = {
  name: string
  appUrl?: string
  logoUrl?: string
}

type ApprovalEmailProps = EmailTemplateProps & {
  registrationDate?: string
}

type RejectionEmailProps = EmailTemplateProps & {
  reason?: string
}

export function getBaseEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aventrada</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .email-header {
          background: linear-gradient(135deg, #9333ea, #ec4899);
          padding: 30px 20px;
          text-align: center;
        }
        
        .email-logo {
          width: 120px;
          height: auto;
          margin-bottom: 15px;
        }
        
        .email-title {
          color: white;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        
        .email-content {
          padding: 30px 20px;
        }
        
        .email-footer {
          background-color: #f3f4f6;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
        
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
          transition: all 0.2s ease;
        }
        
        .button:hover {
          opacity: 0.9;
        }
        
        .social-links {
          margin-top: 15px;
        }
        
        .social-link {
          display: inline-block;
          margin: 0 8px;
        }
        
        .social-icon {
          width: 24px;
          height: 24px;
        }
        
        .divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 25px 0;
        }
        
        .text-highlight {
          color: #9333ea;
          font-weight: 600;
        }
        
        .info-box {
          background-color: #f3f4f6;
          border-left: 4px solid #9333ea;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        
        @media only screen and (max-width: 480px) {
          .email-container {
            width: 100% !important;
          }
          
          .email-content {
            padding: 20px 15px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        ${content}
      </div>
      
      <!-- Pixel de seguimiento -->
      <img src="{{trackingPixel}}" alt="" width="1" height="1" style="display:none;">
    </body>
    </html>
  `
}

export function getApprovalEmailTemplate({
  name,
  registrationDate,
  appUrl = "https://aventrada.com",
  logoUrl = "https://aventrada.com/aventrada-logo.png",
}: ApprovalEmailProps): string {
  const formattedDate = registrationDate ? formatDate(new Date(registrationDate)) : formatDate(new Date())

  const headerContent = `
    <div class="email-header">
      <img src="${logoUrl}" alt="Aventrada Logo" class="email-logo">
      <h1 class="email-title">¡Bienvenido a Aventrada!</h1>
    </div>
  `

  const mainContent = `
    <div class="email-content">
      <p>Hola <span class="text-highlight">${name}</span>,</p>
      
      <p>¡Nos complace informarte que tu solicitud de registro en Aventrada ha sido <strong>aprobada</strong>!</p>
      
      <div class="info-box">
        <p><strong>Fecha de registro:</strong> ${formattedDate}</p>
      </div>
      
      <p>Ahora puedes crear una cuenta en nuestra plataforma y disfrutar de todos los eventos disponibles en Puerto Rico. Descubre conciertos, obras de teatro, eventos deportivos y mucho más.</p>
      
      <div style="text-align: center;">
        <a href="${appUrl}/registro" class="button">Crear mi cuenta</a>
      </div>
      
      <div class="divider"></div>
      
      <h3>¿Qué puedes hacer ahora?</h3>
      <ul>
        <li>Explorar eventos próximos</li>
        <li>Comprar boletos con descuentos exclusivos</li>
        <li>Guardar tus eventos favoritos</li>
        <li>Recibir notificaciones personalizadas</li>
      </ul>
      
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos respondiendo a este correo o a través de nuestras redes sociales.</p>
      
      <p>¡Gracias por unirte a Aventrada!</p>
      
      <p>Atentamente,<br>El equipo de Aventrada</p>
      
      <div style="text-align: center;" class="social-links">
        <a href="https://www.facebook.com/profile.php?id=61575908278497" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" class="social-icon">
        </a>
        <a href="https://x.com/aventrada" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon">
        </a>
        <a href="https://www.instagram.com/aventradaoficial" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon">
        </a>
      </div>
    </div>
  `

  const footerContent = `
    <div class="email-footer">
      <p>© ${new Date().getFullYear()} Aventrada. Todos los derechos reservados.</p>
      <p>Si no solicitaste este correo, puedes ignorarlo de forma segura.</p>
      <p>
        <a href="${appUrl}/privacy" style="color: #6b7280; text-decoration: underline;">Política de Privacidad</a> | 
        <a href="${appUrl}/terms" style="color: #6b7280; text-decoration: underline;">Términos de Servicio</a> | 
        <a href="${appUrl}/unsubscribe?email={{email}}" style="color: #6b7280; text-decoration: underline;">Cancelar suscripción</a>
      </p>
    </div>
  `

  const fullContent = headerContent + mainContent + footerContent
  return getBaseEmailTemplate(fullContent)
}

export function getRejectionEmailTemplate({
  name,
  reason = "No cumple con los requisitos actuales",
  appUrl = "https://aventrada.com",
  logoUrl = "https://aventrada.com/aventrada-logo.png",
}: RejectionEmailProps): string {
  const headerContent = `
    <div class="email-header">
      <img src="${logoUrl}" alt="Aventrada Logo" class="email-logo">
      <h1 class="email-title">Actualización de tu solicitud</h1>
    </div>
  `

  const mainContent = `
    <div class="email-content">
      <p>Hola <span class="text-highlight">${name}</span>,</p>
      
      <p>Gracias por tu interés en unirte a Aventrada. Hemos revisado tu solicitud de registro y lamentamos informarte que no podemos aprobarla en este momento.</p>
      
      <div class="info-box">
        <p><strong>Motivo:</strong> ${reason}</p>
      </div>
      
      <p>Esto no significa que no puedas intentarlo nuevamente en el futuro. Actualmente estamos en fase beta y limitando el acceso a ciertos grupos de usuarios.</p>
      
      <div style="text-align: center;">
        <a href="${appUrl}/contact" class="button">Contactar soporte</a>
      </div>
      
      <div class="divider"></div>
      
      <p>Si crees que ha habido un error o deseas obtener más información, no dudes en contactarnos respondiendo a este correo.</p>
      
      <p>Atentamente,<br>El equipo de Aventrada</p>
      
      <div style="text-align: center;" class="social-links">
        <a href="https://www.facebook.com/profile.php?id=61575908278497" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" class="social-icon">
        </a>
        <a href="https://x.com/aventrada" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon">
        </a>
        <a href="https://www.instagram.com/aventradaoficial" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon">
        </a>
      </div>
    </div>
  `

  const footerContent = `
    <div class="email-footer">
      <p>© ${new Date().getFullYear()} Aventrada. Todos los derechos reservados.</p>
      <p>
        <a href="${appUrl}/privacy" style="color: #6b7280; text-decoration: underline;">Política de Privacidad</a> | 
        <a href="${appUrl}/terms" style="color: #6b7280; text-decoration: underline;">Términos de Servicio</a> | 
        <a href="${appUrl}/unsubscribe?email={{email}}" style="color: #6b7280; text-decoration: underline;">Cancelar suscripción</a>
      </p>
    </div>
  `

  const fullContent = headerContent + mainContent + footerContent
  return getBaseEmailTemplate(fullContent)
}

export function getWelcomeEmailTemplate({
  name,
  appUrl = "https://aventrada.com",
  logoUrl = "https://aventrada.com/aventrada-logo.png",
}: EmailTemplateProps): string {
  const headerContent = `
    <div class="email-header">
      <img src="${logoUrl}" alt="Aventrada Logo" class="email-logo">
      <h1 class="email-title">¡Bienvenido a Aventrada!</h1>
    </div>
  `

  const mainContent = `
    <div class="email-content">
      <p>Hola <span class="text-highlight">${name}</span>,</p>
      
      <p>¡Gracias por registrarte en Aventrada! Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
      
      <p>Tu solicitud ha sido recibida y está siendo revisada por nuestro equipo. Te notificaremos tan pronto como sea aprobada.</p>
      
      <div class="info-box">
        <p><strong>Próximos pasos:</strong></p>
        <ol>
          <li>Espera la confirmación de aprobación</li>
          <li>Crea tu cuenta con el mismo correo electrónico</li>
          <li>Completa tu perfil</li>
          <li>¡Comienza a explorar eventos!</li>
        </ol>
      </div>
      
      <p>Mientras tanto, puedes seguirnos en nuestras redes sociales para estar al tanto de las últimas novedades.</p>
      
      <div style="text-align: center;" class="social-links">
        <a href="https://www.facebook.com/profile.php?id=61575908278497" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" class="social-icon">
        </a>
        <a href="https://x.com/aventrada" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon">
        </a>
        <a href="https://www.instagram.com/aventradaoficial" class="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon">
        </a>
      </div>
    </div>
  `

  const footerContent = `
    <div class="email-footer">
      <p>© ${new Date().getFullYear()} Aventrada. Todos los derechos reservados.</p>
      <p>Si no solicitaste este correo, puedes ignorarlo de forma segura.</p>
      <p>
        <a href="${appUrl}/privacy" style="color: #6b7280; text-decoration: underline;">Política de Privacidad</a> | 
        <a href="${appUrl}/terms" style="color: #6b7280; text-decoration: underline;">Términos de Servicio</a> | 
        <a href="${appUrl}/unsubscribe?email={{email}}" style="color: #6b7280; text-decoration: underline;">Cancelar suscripción</a>
      </p>
    </div>
  `

  const fullContent = headerContent + mainContent + footerContent
  return getBaseEmailTemplate(fullContent)
}
