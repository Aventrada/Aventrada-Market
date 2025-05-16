import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Create a server-side client with cookie support for auth operations
export const createServerAuthClient = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookies.set in read-only context
          console.error("Cannot set cookie in read-only context", error)
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // Handle cookies.remove in read-only context
          console.error("Cannot remove cookie in read-only context", error)
        }
      },
    },
  })
}
