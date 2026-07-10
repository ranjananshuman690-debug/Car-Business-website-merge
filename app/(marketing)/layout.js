'use client'

import { usePathname } from 'next/navigation'
import NavbarWrapper from '@/components/NavbarWrapper'

const NO_NAVBAR_PATHS = ['/login', '/signup', '/forgot-password']

export default function MarketingLayout({ children }) {
  const pathname = usePathname()
  const shouldHideNavbar = NO_NAVBAR_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  )

  if (shouldHideNavbar) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <main className="min-h-screen">
      <NavbarWrapper>
        {children}
      </NavbarWrapper>
    </main>
  )
}
