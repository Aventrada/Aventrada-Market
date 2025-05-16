"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function TerminosYCondiciones() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    aceptacion: true,
    uso: true,
    registro: true,
    compras: true,
    responsabilidad: true,
    propiedad: true,
    suspension: true,
    cambios: true,
    ley: true,
    contacto: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const expandAll = () => {
    const allExpanded = Object.fromEntries(Object.keys(expandedSections).map((key) => [key, true]))
    setExpandedSections(allExpanded)
  }

  const collapseAll = () => {
    const allCollapsed = Object.fromEntries(Object.keys(expandedSections).map((key) => [key, false]))
    setExpandedSections(allCollapsed)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/aventrada-logo.png" alt="Aventrada Logo" width={150} height={40} className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Términos y Condiciones de Uso</h1>

        <p className="text-center text-gray-600 mb-8">Última actualización: 10 de mayo de 2025</p>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
            >
              Expandir todo
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Colapsar todo
            </button>
          </div>

          <p className="text-gray-700 mb-8">
            Estos Términos y Condiciones establecen las reglas y regulaciones para el uso de la plataforma Aventrada, un
            mercado de boletos para eventos ubicado en Puerto Rico. Al acceder a este sitio web, asumimos que acepta
            estos términos y condiciones en su totalidad.
          </p>

          {/* Índice de contenidos */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Índice de contenidos:</h2>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>
                <a href="#aceptacion" className="text-purple-600 hover:underline">
                  Aceptación de los términos
                </a>
              </li>
              <li>
                <a href="#uso" className="text-purple-600 hover:underline">
                  Uso de la plataforma
                </a>
              </li>
              <li>
                <a href="#registro" className="text-purple-600 hover:underline">
                  Registro y cuentas de usuario
                </a>
              </li>
              <li>
                <a href="#compras" className="text-purple-600 hover:underline">
                  Compras y reembolsos
                </a>
              </li>
              <li>
                <a href="#responsabilidad" className="text-purple-600 hover:underline">
                  Responsabilidad del usuario
                </a>
              </li>
              <li>
                <a href="#propiedad" className="text-purple-600 hover:underline">
                  Propiedad intelectual
                </a>
              </li>
              <li>
                <a href="#suspension" className="text-purple-600 hover:underline">
                  Suspensión o cancelación de cuentas
                </a>
              </li>
              <li>
                <a href="#cambios" className="text-purple-600 hover:underline">
                  Cambios en los términos
                </a>
              </li>
              <li>
                <a href="#ley" className="text-purple-600 hover:underline">
                  Ley aplicable
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-purple-600 hover:underline">
                  Contacto
                </a>
              </li>
            </ol>
          </div>

          {/* Secciones */}
          <div className="space-y-6">
            {/* 1. Aceptación de los términos */}
            <section id="aceptacion" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("aceptacion")}
              >
                <h2 className="text-xl font-semibold text-gray-800">1. Aceptación de los términos</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["aceptacion"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["aceptacion"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Al acceder y utilizar la plataforma Aventrada, usted acepta cumplir con estos Términos y Condiciones
                    de Uso, así como con todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de
                    estos términos, está prohibido usar o acceder a este sitio.
                  </p>
                  <p>
                    Estos términos constituyen un acuerdo legalmente vinculante entre usted y Aventrada con respecto a
                    su uso de la plataforma. Al registrarse, acceder o utilizar nuestros servicios, usted confirma que:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ha leído y comprendido estos términos.</li>
                    <li>Tiene al menos 18 años de edad o la mayoría de edad legal en su jurisdicción.</li>
                    <li>
                      Tiene la capacidad legal para celebrar un contrato vinculante con Aventrada y no está legalmente
                      impedido de hacerlo.
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* 2. Uso de la plataforma */}
            <section id="uso" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("uso")}
              >
                <h2 className="text-xl font-semibold text-gray-800">2. Uso de la plataforma</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["uso"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["uso"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Aventrada es una plataforma dedicada a la compra y venta de boletos para eventos en Puerto Rico y
                    otras localidades. Los usuarios pueden utilizar nuestra plataforma para buscar, comprar, vender e
                    intercambiar boletos para diversos eventos.
                  </p>
                  <p>Usos permitidos de la plataforma:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Buscar y comprar boletos para eventos disponibles.</li>
                    <li>Vender boletos legítimos a precios razonables y de acuerdo con las leyes aplicables.</li>
                    <li>Crear y gestionar su cuenta de usuario.</li>
                    <li>Participar en las funciones interactivas de la plataforma de manera respetuosa.</li>
                  </ul>
                  <p>Usos prohibidos de la plataforma:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Vender boletos falsificados o fraudulentos.</li>
                    <li>
                      Revender boletos a precios excesivamente inflados (scalping) en violación de las leyes aplicables.
                    </li>
                    <li>Utilizar bots, rastreadores o métodos automatizados para acceder a la plataforma.</li>
                    <li>Intentar acceder a áreas restringidas de la plataforma o eludir medidas de seguridad.</li>
                    <li>Publicar contenido ofensivo, difamatorio, obsceno o que infrinja los derechos de terceros.</li>
                    <li>Utilizar la plataforma para actividades ilegales o fraudulentas.</li>
                  </ul>
                </div>
              )}
            </section>

            {/* 3. Registro y cuentas de usuario */}
            <section id="registro" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("registro")}
              >
                <h2 className="text-xl font-semibold text-gray-800">3. Registro y cuentas de usuario</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["registro"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["registro"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Para utilizar completamente los servicios de Aventrada, es necesario crear una cuenta de usuario. Al
                    registrarse, usted acepta proporcionar información precisa, actual y completa.
                  </p>
                  <p>Requisitos para la creación de cuentas:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Proporcionar información personal válida y actualizada.</li>
                    <li>Crear una contraseña segura y mantenerla confidencial.</li>
                    <li>No crear múltiples cuentas o cuentas en nombre de otra persona sin autorización.</li>
                    <li>
                      Verificar su dirección de correo electrónico y, cuando sea necesario, otros datos de contacto.
                    </li>
                  </ul>
                  <p>Responsabilidades del usuario:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Mantener la confidencialidad de su contraseña y cuenta.</li>
                    <li>
                      Notificar inmediatamente a Aventrada sobre cualquier uso no autorizado de su cuenta o cualquier
                      otra violación de seguridad.
                    </li>
                    <li>
                      Actualizar su información personal cuando sea necesario para mantenerla precisa y actualizada.
                    </li>
                    <li>Asumir la responsabilidad por todas las actividades que ocurran bajo su cuenta.</li>
                  </ul>
                  <p>
                    Aventrada se reserva el derecho de rechazar el servicio, eliminar cuentas, o cancelar pedidos a
                    nuestra discreción, especialmente en casos de violación de estos términos.
                  </p>
                </div>
              )}
            </section>

            {/* 4. Compras y reembolsos */}
            <section id="compras" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("compras")}
              >
                <h2 className="text-xl font-semibold text-gray-800">4. Compras y reembolsos</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["compras"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["compras"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Al realizar una compra en Aventrada, usted acepta pagar el precio total indicado, incluyendo el
                    precio del boleto, impuestos aplicables y tarifas de servicio.
                  </p>
                  <p>Métodos de pago:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Tarjetas de crédito y débito (Visa, MasterCard, American Express, etc.)</li>
                    <li>Transferencias bancarias</li>
                    <li>Monederos electrónicos y otros métodos de pago digital</li>
                    <li>Otros métodos que puedan estar disponibles en la plataforma</li>
                  </ul>
                  <p>Política de reembolsos:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Las ventas de boletos son generalmente finales y no reembolsables, a menos que se indique lo
                      contrario.
                    </li>
                    <li>
                      En caso de cancelación del evento, los reembolsos se procesarán según las políticas del
                      organizador del evento.
                    </li>
                    <li>
                      Para eventos reprogramados, los boletos generalmente seguirán siendo válidos para la nueva fecha.
                      Si no puede asistir a la fecha reprogramada, las políticas de reembolso dependerán del organizador
                      del evento.
                    </li>
                    <li>
                      Las tarifas de servicio y gastos de envío pueden no ser reembolsables, incluso en caso de
                      cancelación del evento.
                    </li>
                  </ul>
                  <p>
                    Aventrada actúa como intermediario entre compradores y vendedores/organizadores de eventos. Las
                    políticas específicas de reembolso pueden variar según el evento y el organizador. Le recomendamos
                    revisar las políticas específicas de cada evento antes de realizar su compra.
                  </p>
                </div>
              )}
            </section>

            {/* 5. Responsabilidad del usuario */}
            <section id="responsabilidad" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("responsabilidad")}
              >
                <h2 className="text-xl font-semibold text-gray-800">5. Responsabilidad del usuario</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["responsabilidad"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["responsabilidad"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Los usuarios son responsables de todas las actividades que ocurran bajo su cuenta y de su
                    comportamiento en la plataforma.
                  </p>
                  <p>Responsabilidades generales:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cumplir con todas las leyes y regulaciones aplicables al utilizar la plataforma.</li>
                    <li>
                      No utilizar la plataforma para publicar contenido difamatorio, obsceno, ilegal o que infrinja los
                      derechos de terceros.
                    </li>
                    <li>Respetar los derechos de propiedad intelectual de Aventrada y de terceros.</li>
                    <li>
                      No interferir con el funcionamiento normal de la plataforma o intentar acceder a áreas o
                      información a las que no tiene permiso.
                    </li>
                  </ul>
                  <p>Responsabilidades específicas para vendedores:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Garantizar la autenticidad y validez de los boletos ofrecidos para la venta.</li>
                    <li>
                      Proporcionar información precisa sobre los boletos, incluyendo precio, ubicación, restricciones y
                      cualquier otra información relevante.
                    </li>
                    <li>
                      Cumplir con las leyes aplicables relacionadas con la venta de boletos, incluyendo las
                      restricciones sobre la reventa.
                    </li>
                    <li>Entregar los boletos al comprador de manera oportuna y según lo acordado.</li>
                  </ul>
                  <p>Responsabilidades específicas para compradores:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Verificar los detalles del evento y los boletos antes de realizar una compra.</li>
                    <li>Asegurarse de que comprende las políticas de reembolso y cancelación aplicables.</li>
                    <li>Utilizar los boletos de acuerdo con los términos y condiciones específicos del evento.</li>
                    <li>No intentar duplicar, falsificar o modificar los boletos adquiridos.</li>
                  </ul>
                </div>
              )}
            </section>

            {/* 6. Propiedad intelectual */}
            <section id="propiedad" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("propiedad")}
              >
                <h2 className="text-xl font-semibold text-gray-800">6. Propiedad intelectual</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["propiedad"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["propiedad"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Todo el contenido presente en la plataforma Aventrada, incluyendo pero no limitado a textos,
                    gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y software, es propiedad
                    de Aventrada o de sus proveedores de contenido y está protegido por las leyes de propiedad
                    intelectual.
                  </p>
                  <p>Derechos de Aventrada:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      El nombre "Aventrada", el logotipo y otros identificadores de marca son marcas comerciales
                      registradas o no registradas de Aventrada.
                    </li>
                    <li>
                      El diseño, estructura, selección, coordinación, expresión, apariencia y disposición del contenido
                      en la plataforma están protegidos por derechos de autor.
                    </li>
                    <li>
                      El software, código, métodos y procesos utilizados en la plataforma son propiedad de Aventrada o
                      sus licenciantes.
                    </li>
                  </ul>
                  <p>Restricciones para los usuarios:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      No puede copiar, reproducir, modificar, republicar, cargar, publicar, transmitir o distribuir
                      cualquier material de nuestra plataforma sin nuestro consentimiento previo por escrito.
                    </li>
                    <li>No puede utilizar el contenido de la plataforma para fines comerciales sin autorización.</li>
                    <li>
                      No puede utilizar técnicas de ingeniería inversa, descompilar o desensamblar cualquier software
                      contenido en la plataforma.
                    </li>
                    <li>
                      No puede eliminar, alterar u ocultar cualquier aviso de derechos de autor, marca comercial u otros
                      derechos de propiedad.
                    </li>
                  </ul>
                  <p>
                    El uso no autorizado de cualquier material puede violar las leyes de derechos de autor, marcas
                    comerciales y otras leyes aplicables, y puede resultar en sanciones civiles o penales.
                  </p>
                </div>
              )}
            </section>

            {/* 7. Suspensión o cancelación de cuentas */}
            <section id="suspension" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("suspension")}
              >
                <h2 className="text-xl font-semibold text-gray-800">7. Suspensión o cancelación de cuentas</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["suspension"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["suspension"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Aventrada se reserva el derecho de suspender o cancelar cuentas de usuario por diversas razones,
                    incluyendo pero no limitado a:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Violaciones a estos Términos y Condiciones.</li>
                    <li>Actividades fraudulentas o sospechosas.</li>
                    <li>Venta de boletos falsificados o inválidos.</li>
                    <li>Comportamiento abusivo hacia otros usuarios o personal de Aventrada.</li>
                    <li>Uso de la plataforma para actividades ilegales.</li>
                    <li>Incumplimiento de pago o disputas de pago no resueltas.</li>
                    <li>Inactividad prolongada de la cuenta.</li>
                    <li>Por solicitud del usuario.</li>
                    <li>Cualquier otra razón a nuestra discreción razonable.</li>
                  </ul>
                  <p>Consecuencias de la suspensión o cancelación:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Suspensión temporal: Durante una suspensión, el usuario no podrá acceder a su cuenta o utilizar
                      los servicios de Aventrada hasta que se resuelvan los problemas identificados.
                    </li>
                    <li>
                      Cancelación permanente: En caso de cancelación, el usuario perderá permanentemente el acceso a su
                      cuenta, historial de compras y boletos asociados.
                    </li>
                    <li>
                      Boletos activos: Dependiendo de la gravedad de la infracción, Aventrada puede optar por honrar o
                      cancelar los boletos ya comprados o vendidos.
                    </li>
                    <li>
                      Reembolsos: La decisión de emitir reembolsos en caso de cancelación de cuenta se tomará caso por
                      caso, según la naturaleza de la infracción y las circunstancias.
                    </li>
                  </ul>
                  <p>
                    Aventrada se esforzará por notificar al usuario sobre la suspensión o cancelación de su cuenta,
                    cuando sea posible, explicando las razones y, si corresponde, los pasos para restablecer el acceso.
                  </p>
                </div>
              )}
            </section>

            {/* 8. Cambios en los términos */}
            <section id="cambios" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("cambios")}
              >
                <h2 className="text-xl font-semibold text-gray-800">8. Cambios en los términos</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["cambios"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["cambios"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Aventrada se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los
                    cambios pueden deberse a:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cambios en nuestros servicios o en la forma en que operamos.</li>
                    <li>Cambios en las leyes y regulaciones aplicables.</li>
                    <li>Mejoras en la seguridad y protección de los usuarios.</li>
                    <li>Actualizaciones en nuestras políticas internas.</li>
                  </ul>
                  <p>Proceso de notificación:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.</li>
                    <li>
                      Para cambios significativos, haremos esfuerzos razonables para notificar a los usuarios a través
                      de:
                      <ul className="list-disc pl-5 mt-2">
                        <li>Avisos en la plataforma</li>
                        <li>Correos electrónicos a las direcciones registradas</li>
                        <li>Notificaciones en la aplicación</li>
                      </ul>
                    </li>
                    <li>
                      La fecha de "Última actualización" al principio de estos términos indicará cuándo se realizó la
                      revisión más reciente.
                    </li>
                  </ul>
                  <p>Responsabilidad del usuario:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Es responsabilidad del usuario revisar periódicamente estos términos para estar al tanto de las
                      modificaciones.
                    </li>
                    <li>
                      El uso continuado de la plataforma después de la publicación de cambios constituye la aceptación
                      de dichos cambios.
                    </li>
                    <li>Si no está de acuerdo con los términos modificados, debe dejar de utilizar la plataforma.</li>
                  </ul>
                </div>
              )}
            </section>

            {/* 9. Ley aplicable */}
            <section id="ley" className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("ley")}
              >
                <h2 className="text-xl font-semibold text-gray-800">9. Ley aplicable</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["ley"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["ley"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Estos Términos y Condiciones se rigen por las leyes del Estado Libre Asociado de Puerto Rico y las
                    leyes federales aplicables de los Estados Unidos, sin consideración a conflictos de principios
                    legales.
                  </p>
                  <p>Jurisdicción y resolución de disputas:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Cualquier disputa relacionada con estos términos o con el uso de la plataforma Aventrada será
                      sometida a la jurisdicción exclusiva de los tribunales competentes en San Juan, Puerto Rico.
                    </li>
                    <li>
                      Antes de iniciar cualquier acción legal, las partes acuerdan intentar resolver la disputa de
                      manera amistosa a través de comunicaciones directas.
                    </li>
                    <li>
                      Para disputas de menor cuantía, Aventrada puede ofrecer un proceso de resolución alternativa de
                      disputas.
                    </li>
                  </ul>
                  <p>Disposiciones adicionales:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Si alguna disposición de estos términos se considera inválida o inaplicable, las disposiciones
                      restantes permanecerán en pleno vigor y efecto.
                    </li>
                    <li>
                      La renuncia por parte de Aventrada a hacer cumplir cualquier derecho o disposición de estos
                      términos no constituirá una renuncia a dicho derecho o disposición en el futuro.
                    </li>
                    <li>
                      Estos términos constituyen el acuerdo completo entre usted y Aventrada con respecto al uso de la
                      plataforma y reemplazan cualquier acuerdo anterior.
                    </li>
                  </ul>
                  <p>
                    Al utilizar nuestra plataforma, usted reconoce que ha leído, entendido y aceptado estar sujeto a
                    estos términos y a la jurisdicción especificada.
                  </p>
                </div>
              )}
            </section>

            {/* 10. Contacto */}
            <section id="contacto" className="pb-2">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection("contacto")}
              >
                <h2 className="text-xl font-semibold text-gray-800">10. Contacto</h2>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  {expandedSections["contacto"] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expandedSections["contacto"] && (
                <div className="mt-3 text-gray-700 space-y-3">
                  <p>
                    Si tiene preguntas, comentarios o solicitudes relacionadas con estos Términos y Condiciones o el uso
                    de nuestra plataforma, puede contactarnos a través de:
                  </p>
                  <p className="mt-2">
                    <strong>Correo electrónico:</strong>{" "}
                    <a
                      href="mailto:legal@aventrada.com"
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      legal@aventrada.com
                    </a>
                  </p>
                  <p className="mt-2">
                    <strong>Dirección postal:</strong> Calle Comercio #123, San Juan, Puerto Rico 00901
                  </p>
                  <p className="mt-2">
                    <strong>Teléfono:</strong> +1 (787) 555-0123
                  </p>
                  <p className="mt-3">
                    Nuestro equipo de atención al cliente está disponible de lunes a viernes, de 9:00 AM a 6:00 PM (hora
                    de Puerto Rico). Para consultas urgentes fuera de este horario, por favor envíe un correo
                    electrónico y nos pondremos en contacto con usted lo antes posible.
                  </p>
                  <p className="mt-3">
                    Para asuntos relacionados con boletos específicos o eventos, le recomendamos incluir los detalles
                    relevantes como números de orden, fechas de eventos y cualquier otra información que pueda ayudarnos
                    a atender su consulta de manera más eficiente.
                  </p>
                </div>
              )}
            </section>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>
              Estos Términos y Condiciones pueden ser actualizados periódicamente. Le notificaremos sobre cambios
              significativos a través de nuestra plataforma o por correo electrónico.
            </p>
          </div>
        </div>

        {/* Botón para volver arriba */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={scrollToTop}
            className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
            aria-label="Volver arriba"
          >
            <ChevronUp size={24} />
          </button>
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
