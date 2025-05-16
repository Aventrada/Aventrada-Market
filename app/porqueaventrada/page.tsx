import { redirect } from "next/navigation"

// Redirect from alternative URL without hyphens
export default function PorqueAventradaRedirect() {
  redirect("/por-que-aventrada")
}
