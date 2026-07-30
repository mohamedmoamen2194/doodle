"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function useHeroActive() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!isHome) return

    function check() {
      const section = document.getElementById("hero-section")
      if (!section) return
      const bottom = section.getBoundingClientRect().bottom
      setActive(bottom > window.innerHeight)
    }

    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [isHome])

  return isHome ? active : false
}
