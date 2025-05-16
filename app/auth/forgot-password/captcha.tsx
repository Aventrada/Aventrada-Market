"use client"

import { useState, useEffect } from "react"
import Script from "next/script"

interface CaptchaProps {
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: any) => string
      reset: (widgetId: string) => void
    }
    onCaptchaLoad: () => void
  }
}

export default function Captcha({ onVerify, onExpire, onError }: CaptchaProps) {
  const [widgetId, setWidgetId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Replace with your actual Cloudflare Turnstile site key
  const siteKey = "1x00000000000000000000AA" // Replace with your actual site key

  useEffect(() => {
    // Initialize captcha when the script is loaded
    if (isLoaded && window.turnstile) {
      const id = window.turnstile.render("#captcha-container", {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token)
        },
        "expired-callback": () => {
          if (onExpire) onExpire()
        },
        "error-callback": () => {
          if (onError) onError()
        },
      })
      setWidgetId(id)
    }

    return () => {
      // Clean up on unmount
      if (widgetId && window.turnstile) {
        window.turnstile.reset(widgetId)
      }
    }
  }, [isLoaded, onVerify, onExpire, onError])

  // Function to reset the captcha
  const resetCaptcha = () => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId)
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        async
        defer
        onLoad={() => setIsLoaded(true)}
      />
      <div id="captcha-container" className="flex justify-center my-4"></div>
    </>
  )
}
