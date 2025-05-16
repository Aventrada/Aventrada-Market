/**
 * Checks if an email exists in the registrations table
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.trim().toLowerCase()
    const response = await fetch("/api/check-email-exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: normalizedEmail }),
    })

    if (!response.ok) {
      throw new Error("Error checking email")
    }

    const data = await response.json()
    return data.exists
  } catch (error) {
    console.error("Error checking if email exists:", error)
    return false
  }
}

/**
 * Finds a similar email in the registrations table
 */
export async function findSimilarEmail(email: string): Promise<string | null> {
  try {
    const normalizedEmail = email.trim().toLowerCase()
    const response = await fetch("/api/find-similar-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: normalizedEmail }),
    })

    if (!response.ok) {
      throw new Error("Error finding similar email")
    }

    const data = await response.json()
    return data.similarEmail
  } catch (error) {
    console.error("Error finding similar email:", error)
    return null
  }
}
