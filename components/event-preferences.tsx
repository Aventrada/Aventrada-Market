"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export function EventPreferences() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["Conciertos", "Teatro", "Deportes", "Festivales", "Gastronomía", "Arte", "Familia", "Cultura"]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="w-full mt-6">
      <p className="text-white font-medium mb-3">¿Qué tipo de eventos te interesan?</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategories.includes(category)
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-black/30 text-gray-300 border border-white/10 hover:border-purple-500/50"
            }`}
          >
            {selectedCategories.includes(category) && <Check className="inline-block w-3 h-3 mr-1" />}
            {category}
          </button>
        ))}
      </div>
      <input type="hidden" name="preferences" value={selectedCategories.join(",")} />
    </div>
  )
}
