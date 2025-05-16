import { redirect } from "next/navigation"

// Redirect from old /auth/login to new /auth/signin
export default function LoginRedirect() {
  redirect("/auth/signin")
}
