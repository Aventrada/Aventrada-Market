"use client"

import { useEffect, useState } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Fecha objetivo: 7 días desde ahora
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7)

    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="text-purple-300 font-medium mb-2">Acceso limitado - Cierre de registro en:</p>
      <div className="flex space-x-4">
        {[
          { value: timeLeft.days, label: "Días" },
          { value: timeLeft.hours, label: "Horas" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Seg" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold text-white">
              {item.value.toString().padStart(2, "0")}
            </div>
            <span className="text-xs text-gray-400 mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
