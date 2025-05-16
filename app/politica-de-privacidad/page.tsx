"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { AventradaLogo } from "@/components/aventrada-logo"

export default function PoliticaDePrivacidad() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    informacion: true,
    uso: true,
    proteccion: true,
    compartir: true,
    derechos: true,
    cookies: true,
    menores: true,
    contacto: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <AventradaLogo href="https://www.aventrada.com/" size="medium" />
          <Link
            href="https://www.aventrada.com/"
            className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Política de Privacidad de Aventrada
        </h1>

        <p className="text-center text-gray-600 mb-8">Última actualización: 10 de mayo de 2025</p>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <p className="text-gray-700 mb-8">
            En Aventrada, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos,
            utilizamos, compartimos y protegemos la información que nos proporcionas al utilizar nuestra plataforma de
            venta de boletos para eventos en Puerto Rico.
          </p>

          {/* Secciones */}
          <div className="space-y-6">
            {/* Información que recopilamos */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("informacion")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Información que recopilamos</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["informacion"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["informacion"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>Recopilamos la siguiente información cuando utilizas nuestra plataforma:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Información personal:</strong> Nombre, dirección, número de teléfono, correo electrónico y
                      datos de pago.
                    </li>
                    <li>
                      <strong>Información de la cuenta:</strong> Nombre de usuario, contraseña e historial de compras.
                    </li>
                    <li>
                      <strong>Información de uso:</strong> Cómo interactúas con nuestra plataforma, qué eventos te
                      interesan y tus preferencias.
                    </li>
                    <li>
                      <strong>Información del dispositivo:</strong> Tipo de dispositivo, sistema operativo, dirección IP
                      y datos de navegación.
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* Cómo usamos tu información */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("uso")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Cómo usamos tu información</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["uso"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["uso"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>Utilizamos tu información para los siguientes propósitos:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Procesar la compra de boletos y gestionar tu cuenta.</li>
                    <li>
                      Enviarte confirmaciones de compra, actualizaciones sobre eventos y cambios en la programación.
                    </li>
                    <li>Mejorar nuestros servicios y personalizar tu experiencia en nuestra plataforma.</li>
                    <li>
                      Enviarte información sobre eventos similares que puedan interesarte, siempre respetando tus
                      preferencias de comunicación.
                    </li>
                    <li>Prevenir fraudes y garantizar la seguridad de las transacciones.</li>
                    <li>Cumplir con nuestras obligaciones legales y fiscales en Puerto Rico.</li>
                  </ul>
                </div>
              )}
            </section>

            {/* Protección de datos */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("proteccion")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Protección de datos</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["proteccion"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["proteccion"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    La seguridad de tus datos es nuestra prioridad. Implementamos medidas técnicas y organizativas para
                    proteger tu información personal:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Utilizamos encriptación SSL para proteger la transmisión de datos sensibles.</li>
                    <li>Almacenamos tu información en servidores seguros con acceso restringido.</li>
                    <li>
                      Realizamos auditorías de seguridad periódicas para identificar y corregir posibles
                      vulnerabilidades.
                    </li>
                    <li>
                      Capacitamos a nuestro personal sobre la importancia de la confidencialidad y la protección de
                      datos.
                    </li>
                    <li>
                      Cumplimos con las regulaciones de protección de datos aplicables en Puerto Rico y Estados Unidos.
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* Con quién compartimos tu información */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("compartir")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Con quién compartimos tu información</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["compartir"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["compartir"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>Podemos compartir tu información con:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Organizadores de eventos:</strong> Para facilitar la entrada al evento y verificar la
                      validez de los boletos.
                    </li>
                    <li>
                      <strong>Proveedores de servicios:</strong> Empresas que nos ayudan a procesar pagos, enviar
                      correos electrónicos y analizar datos.
                    </li>
                    <li>
                      <strong>Autoridades:</strong> Cuando sea requerido por ley, orden judicial o para proteger
                      nuestros derechos legales.
                    </li>
                  </ul>
                  <p className="mt-3">
                    No vendemos tu información personal a terceros con fines publicitarios o comerciales.
                  </p>
                </div>
              )}
            </section>

            {/* Tus derechos como usuario */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("derechos")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Tus derechos como usuario</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["derechos"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["derechos"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>Como usuario de Aventrada, tienes derecho a:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Acceder a la información personal que tenemos sobre ti.</li>
                    <li>Solicitar la corrección de información inexacta o incompleta.</li>
                    <li>Solicitar la eliminación de tus datos personales (sujeto a obligaciones legales).</li>
                    <li>Oponerte al procesamiento de tus datos para ciertos fines.</li>
                    <li>Retirar tu consentimiento en cualquier momento para comunicaciones de marketing.</li>
                    <li>Presentar una reclamación ante la autoridad de protección de datos correspondiente.</li>
                  </ul>
                  <p className="mt-3">Para ejercer estos derechos, contáctanos a través de privacidad@aventrada.com.</p>
                </div>
              )}
            </section>

            {/* Uso de cookies */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("cookies")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Uso de cookies</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["cookies"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["cookies"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>Utilizamos cookies y tecnologías similares para:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Mantener tu sesión activa mientras navegas por nuestra plataforma.</li>
                    <li>Recordar tus preferencias y configuraciones.</li>
                    <li>Analizar cómo utilizas nuestra plataforma para mejorarla.</li>
                    <li>Personalizar el contenido y los anuncios según tus intereses.</li>
                  </ul>
                  <p className="mt-3">
                    Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. Ten en
                    cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de nuestra plataforma.
                  </p>
                </div>
              )}
            </section>

            {/* Menores de edad */}
            <section className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("menores")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Menores de edad</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["menores"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["menores"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Nuestra plataforma no está dirigida a menores de 18 años. No recopilamos intencionalmente
                    información personal de menores. Si eres padre o tutor y crees que tu hijo nos ha proporcionado
                    información personal, contáctanos para que podamos tomar las medidas necesarias.
                  </p>
                  <p className="mt-3">
                    Para ciertos eventos dirigidos a menores, requerimos el consentimiento verificable de los padres o
                    tutores antes de recopilar cualquier información personal.
                  </p>
                </div>
              )}
            </section>

            {/* Contacto */}
            <section className="pb-2">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("contacto")}
              >
                <h2 className="text-xl font-semibold text-gray-800">Contacto</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["contacto"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["contacto"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Si tienes preguntas, comentarios o solicitudes relacionadas con esta Política de Privacidad o el
                    tratamiento de tus datos personales, contáctanos a través de:
                  </p>
                  <p className="mt-2">
                    <strong>Correo electrónico:</strong>{" "}
                    <a
                      href="mailto:privacidad@aventrada.com"
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      privacidad@aventrada.com
                    </a>
                  </p>
                  <p className="mt-2">
                    <strong>Dirección postal:</strong> Calle Comercio #2, San Juan, Puerto Rico 00901
                  </p>
                  <p className="mt-2">
                    <strong>Teléfono:</strong> +1 (787) 555-1234
                  </p>
                  <p className="mt-3">
                    Nos comprometemos a responder a tu solicitud dentro de un plazo razonable, generalmente en un máximo
                    de 30 días.
                  </p>
                </div>
              )}
            </section>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>
              Esta Política de Privacidad puede ser actualizada periódicamente. Te notificaremos sobre cambios
              significativos a través de nuestra plataforma o por correo electrónico.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2025 Aventrada. Todos los derechos reservados.</p>
            <div className="mt-2 space-x-4">
              <Link href="/terminos-y-condiciones" className="text-purple-600 hover:text-purple-800 transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/politica-de-privacidad" className="text-purple-600 hover:text-purple-800 transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
