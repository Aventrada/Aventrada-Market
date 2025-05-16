"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Rodríguez",
    role: "Promotor de Eventos",
    image: "/diverse-group.png",
    content:
      "Aventrada ha revolucionado la forma en que promociono mis eventos. La plataforma es intuitiva y me ha permitido llegar a un público mucho más amplio.",
    rating: 5,
  },
  {
    name: "María Sánchez",
    role: "Aficionada a Conciertos",
    image: "/diverse-woman-portrait.png",
    content:
      "Encontrar y comprar boletos nunca había sido tan fácil. La experiencia de usuario es excelente y los precios son muy competitivos.",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    role: "Organizador de Festivales",
    image: "/thoughtful-man.png",
    content:
      "Las herramientas de análisis y seguimiento de ventas son increíbles. Me han ayudado a entender mejor a mi audiencia y optimizar mis eventos.",
    rating: 4,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Lo que dicen nuestros usuarios</h2>

      <div className="relative">
        <div className="overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-purple-500">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                />
              ))}
            </div>

            <p className="text-gray-300 italic mb-6">"{testimonials[currentIndex].content}"</p>

            <div>
              <p className="font-medium text-white">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-purple-400">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white border border-white/20 hover:bg-purple-600 transition-colors"
          aria-label="Testimonio anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white border border-white/20 hover:bg-purple-600 transition-colors"
          aria-label="Siguiente testimonio"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-purple-500" : "bg-gray-600"}`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
