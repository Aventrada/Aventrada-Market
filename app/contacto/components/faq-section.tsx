"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: "¿Cómo puedo recibir ayuda con mi compra?",
    answer:
      "Si necesitas ayuda con tu compra, puedes contactarnos a través del formulario en esta página o enviarnos un correo electrónico directamente a info@aventrada.com. Nuestro equipo de soporte te responderá lo antes posible.",
  },
  {
    question: "¿Cuál es el tiempo de respuesta para consultas?",
    answer:
      "Normalmente respondemos a todas las consultas dentro de 24-48 horas hábiles. Para casos urgentes, te recomendamos incluir 'URGENTE' en el asunto de tu mensaje.",
  },
  {
    question: "¿Puedo solicitar un reembolso por mis boletos?",
    answer:
      "Las políticas de reembolso dependen del organizador del evento. Te recomendamos revisar los términos y condiciones específicos del evento antes de realizar tu compra. Si necesitas más información, contáctanos y te ayudaremos a resolver tu situación.",
  },
  {
    question: "¿Cómo puedo vender boletos en Aventrada?",
    answer:
      "Para vender boletos en Aventrada, debes registrarte como organizador. Contáctanos a través del formulario seleccionando 'Vender en Aventrada' como asunto y te proporcionaremos toda la información necesaria para comenzar.",
  },
  {
    question: "¿Qué hago si no recibí mis boletos por correo electrónico?",
    answer:
      "Si no has recibido tus boletos después de completar tu compra, primero revisa tu carpeta de spam o correo no deseado. Si aún no los encuentras, contáctanos con tu número de confirmación y correo electrónico utilizado para la compra, y resolveremos el problema rápidamente.",
  },
]

export default function FaqSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Preguntas frecuentes</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function FaqItem({ question, answer, index }: FaqItem & { index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-6 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-gray-700">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
