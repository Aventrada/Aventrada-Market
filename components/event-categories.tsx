import { Music, Theater, ClubIcon as Football, MapPin } from "lucide-react"

export function EventCategories() {
  const categories = [
    {
      icon: <Music className="h-6 w-6" />,
      name: "Conciertos",
      description: "Artistas locales e internacionales",
    },
    {
      icon: <Theater className="h-6 w-6" />,
      name: "Teatro",
      description: "Obras y espectáculos",
    },
    {
      icon: <Football className="h-6 w-6" />,
      name: "Deportes",
      description: "Eventos deportivos",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      name: "Festivales",
      description: "Celebraciones culturales",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
        >
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-3">{category.icon}</div>
          <h3 className="font-medium text-white">{category.name}</h3>
          <p className="text-sm text-gray-400 text-center mt-1">{category.description}</p>
        </div>
      ))}
    </div>
  )
}
