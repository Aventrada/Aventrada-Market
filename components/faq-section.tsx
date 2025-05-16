"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "¿Cómo funciona la lista de espera?",
    answer:
      "Estamos abriendo Aventrada por grupos limitados. Al registrarte, entras en la lista de espera y te notificaremos por correo electrónico cuando sea tu turno para acceder a la plataforma.",
  },
  {
    question: "¿Qué tipo de eventos puedo encontrar?",
    answer:
      "Aventrada ofrece acceso a una amplia variedad de eventos en Puerto Rico, incluyendo conciertos, obras de teatro, eventos deportivos, festivales culturales y mucho más.",
  },
  {
    question: "¿Cómo puedo vender mis boletos?",
    answer:
      "Una vez tengas acceso a la plataforma, podrás registrarte como vendedor y publicar tus eventos. Ofrecemos herramientas fáciles de usar para gestionar tus ventas y promociones.",
  },
  {
    question: "¿Hay algún costo por registrarse?",
    answer:
      "El registro en Aventrada es completamente gratuito. Solo pagas una pequeña comisión cuando vendes boletos a través de nuestra plataforma.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Preguntas Frecuentes</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm">
            <button
              className="flex justify-between items-center w-full p-4 text-left text-white font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 text-purple-400 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}
              />
            </button>

            {openIndex === index && <div className="px-4 pb-4 text-gray-300">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
