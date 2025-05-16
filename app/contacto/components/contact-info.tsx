"use client"

import Link from "next/link"
import { Mail, Clock, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-2">Información de contacto</h2>
      <p className="text-gray-700 mb-6">Puedes contactarnos directamente a través de estos medios.</p>

      <div className="space-y-6 mb-8">
        <motion.div
          className="flex items-start gap-3"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-full bg-[#B46CFF]/10 flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-[#B46CFF]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Correo electrónico</p>
            <a href="mailto:info@aventrada.com" className="text-[#B46CFF] hover:underline transition-colors">
              info@aventrada.com
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex items-start gap-3"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-full bg-[#B46CFF]/10 flex items-center justify-center flex-shrink-0">
            <Phone className="h-5 w-5 text-[#B46CFF]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Teléfono</p>
            <a href="tel:+17875551234" className="text-[#B46CFF] hover:underline transition-colors">
              +1 (787) 555-1234
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex items-start gap-3"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-full bg-[#B46CFF]/10 flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-[#B46CFF]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Horario de atención</p>
            <p className="text-gray-700">Lunes a viernes: 9:00 AM - 6:00 PM</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <p className="font-medium text-gray-900 mb-4">Síguenos en redes sociales</p>
        <div className="flex gap-4">
          <SocialIcon href="https://instagram.com/aventradapr" icon="/social/instagram.png" label="Instagram" />
          <SocialIcon href="https://facebook.com/aventradapr" icon="/social/facebook.png" label="Facebook" />
          <SocialIcon href="https://tiktok.com/@aventradapr" icon="/social/tiktok.png" label="TikTok" />
        </div>
      </div>
    </motion.div>
  )
}

function SocialIcon({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#B46CFF]/10 flex items-center justify-center hover:bg-[#B46CFF]/20 transition-colors"
        aria-label={label}
      >
        <div className="w-5 h-5 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${icon})` }} />
      </Link>
    </motion.div>
  )
}
