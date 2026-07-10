'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

const NO_NAVBAR_PATHS = ['/login', '/signup', '/forgot-password']

export default function NavbarWrapper({ children }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldHideNavbar =
    NO_NAVBAR_PATHS.some((path) => pathname === path || pathname.startsWith(path + '/'))

  if (!mounted) {
    if (shouldHideNavbar) {
      return <>{children}</>
    }
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-20 bg-white z-50" />
        {children}
      </>
    )
  }

  if (shouldHideNavbar) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
