import { redirect } from "next/navigation"

// Redirect from alternative URL with different hyphenation
export default function PorqueAventradaRedirect() {
  redirect("/por-que-aventrada")
}
