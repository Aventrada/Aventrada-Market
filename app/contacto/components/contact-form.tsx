"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

// Definir el esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
  asunto: z.string().min(1, {
    message: "Por favor, selecciona un asunto.",
  }),
  mensaje: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    },
    mode: "onChange", // Validación en tiempo real
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      // Implementación real del envío del formulario
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el formulario")
      }

      setFormStatus({
        type: "success",
        message: "¡Mensaje enviado con éxito! Te responderemos lo antes posible.",
      })
      form.reset()
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold mb-2">Envíanos un mensaje</h2>
      <p className="text-gray-700 mb-6">Completa el formulario y te responderemos lo antes posible.</p>

      {formStatus.type && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            className={`mb-6 ${
              formStatus.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              {formStatus.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <AlertDescription>{formStatus.message}</AlertDescription>
            </div>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Nombre completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre completo"
                      {...field}
                      className="border-gray-300 focus:border-[#B46CFF] focus:ring focus:ring-[#B46CFF]/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@ejemplo.com"
                      {...field}
                      className="border-gray-300 focus:border-[#B46CFF] focus:ring focus:ring-[#B46CFF]/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="asunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Asunto</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-gray-300 focus:border-[#B46CFF] focus:ring focus:ring-[#B46CFF]/20 transition-all">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="soporte">Soporte técnico</SelectItem>
                    <SelectItem value="boletos">Consulta sobre boletos</SelectItem>
                    <SelectItem value="reembolso">Solicitud de reembolso</SelectItem>
                    <SelectItem value="vender">Vender en Aventrada</SelectItem>
                    <SelectItem value="otro">Otro asunto</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe tu mensaje aquí..."
                    className="min-h-[150px] resize-none border-gray-300 focus:border-[#B46CFF] focus:ring focus:ring-[#B46CFF]/20 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A45BEE] hover:to-[#E83781] text-white font-medium py-2.5 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar mensaje"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}
