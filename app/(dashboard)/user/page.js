'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Car, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-12">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light capitalize text-gray-900">{activeTab}</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {user.firstName || user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg cursor-pointer transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'profile', label: 'Profile' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
              <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Your Dashboard</h3>
              <p className="text-gray-500 max-w-md mx-auto">Welcome to your personal dashboard. More features coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Profile</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">Manage your account details and preferences.</p>
            <Link
              href="/user/userProfile"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
            >
              View & Edit Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
