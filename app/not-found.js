'use client'

import Link from 'next/link'
import { Car } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-600/20">
          <Car className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-8xl font-light text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-light mb-4 text-gray-900">
          Page <span className="text-red-600 italic">Not Found</span>
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on the road.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 hover:shadow-xl hover:-translate-y-1"
          >
            Back to Home
          </Link>
          <Link
            href="/inventory"
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-900 hover:bg-gray-50 transition-all"
          >
            View Inventory
          </Link>
        </div>
      </div>
    </div>
  )
}
