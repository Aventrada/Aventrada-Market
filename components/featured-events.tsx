import { Calendar, MapPin, Clock } from "lucide-react"

const featuredEvents = [
  {
    id: 1,
    title: "Festival de la Salsa",
    image: "/salsa-festival.png",
    date: "15 de Junio, 2023",
    location: "San Juan, PR",
    time: "5:00 PM",
    category: "Conciertos",
  },
  {
    id: 2,
    title: "Teatro: La Casa de Bernarda Alba",
    image: "/placeholder.svg?key=xni60",
    date: "22 de Junio, 2023",
    location: "Ponce, PR",
    time: "7:30 PM",
    category: "Teatro",
  },
  {
    id: 3,
    title: "Torneo de Baloncesto",
    image: "/placeholder.svg?key=f2059",
    date: "30 de Junio, 2023",
    location: "Mayagüez, PR",
    time: "3:00 PM",
    category: "Deportes",
  },
]

export function FeaturedEvents() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Próximos Eventos Destacados</h2>
        <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
          Ver todos →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                {event.category}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-white text-lg mb-2">{event.title}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  {event.time}
                </div>
              </div>

              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30 hover:from-purple-600 hover:to-pink-600 transition-all">
                Más Información
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
