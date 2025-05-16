import { Facebook, Twitter, Instagram } from "lucide-react"

export function SocialSharing() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/profile.php?id=61575908278497`,
    },
    {
      name: "X",
      icon: <Twitter className="h-5 w-5" />,
      url: `https://x.com/aventrada`,
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: `https://www.instagram.com/aventradaoficial`,
    },
  ]

  return (
    <div className="flex flex-col items-center mt-8">
      <p className="text-gray-400 text-sm mb-3">Síguenos en redes sociales</p>
      <div className="flex space-x-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all"
            aria-label={`Seguir en ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
