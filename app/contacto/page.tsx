import type { Metadata } from "next"
import ContactForm from "./components/contact-form"
import ContactInfo from "./components/contact-info"
import FaqSection from "./components/faq-section"
import ContactHeader from "./components/contact-header"

export const metadata: Metadata = {
  title: "Contacto | Aventrada",
  description: "Contáctanos para cualquier consulta sobre eventos, boletos o soporte en Aventrada.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Improved Hero Section */}
      <ContactHeader />

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Contact Form - 7/12 width on desktop */}
            <div className="md:col-span-7 bg-white rounded-xl shadow-sm p-6 md:p-8 transform transition-all duration-300 hover:shadow-md">
              <ContactForm />
            </div>

            {/* Contact Info - 5/12 width on desktop */}
            <div className="md:col-span-5 bg-white rounded-xl shadow-sm p-6 md:p-8 transform transition-all duration-300 hover:shadow-md">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />
    </main>
  )
}
