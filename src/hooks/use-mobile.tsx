
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [isIOS, setIsIOS] = React.useState<boolean>(false)
  const [isAndroid, setIsAndroid] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Check if device is mobile based on screen width
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(iOS)
    
    // Detect Android
    const Android = /Android/.test(navigator.userAgent)
    setIsAndroid(Android)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return {
    isMobile: !!isMobile,
    isIOS,
    isAndroid,
    isTouchDevice: isIOS || isAndroid
  }
}

// Add a simpler version that just returns a boolean for components that only need to know if it's mobile
export function useIsMobileBoolean(): boolean {
  const { isMobile } = useIsMobile()
  return isMobile
}
