import { useEffect, useState } from 'react'

export const useUA = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (navigator.userAgentData) {
      const ua = navigator.userAgentData
      setIsMobile(ua.mobile)
    } else {
      const ua = navigator.userAgent
      setIsMobile(detectMobile(ua))
    }
    setIsLoading(true)
  }, [])

  const detectMobile = (uaStr: string) => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ]

    return toMatch.some((toMatchItem) => uaStr.match(toMatchItem))
  }

  return { isMobile, isLoading }
}
