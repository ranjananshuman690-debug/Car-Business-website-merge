'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Car,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  MoreVertical,
  User
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: carsData } = useSWR('/api/cars', fetcher)
  const { data: inquiriesData } = useSWR('/api/inquiries', fetcher)
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

  const cars = carsData?.data || []
  const inquiries = inquiriesData?.data || []

  const stats = [
    { label: 'Total Inventory', value: String(cars.length), change: '+12', icon: Car, color: 'red' },
    { label: 'Active Leads', value: String(inquiries.filter(i => i.status === 'new' || i.status === 'contacted').length), change: '+5', icon: Users, color: 'orange' },
    { label: 'Revenue', value: '$2.4M', change: '+18%', icon: DollarSign, color: 'red' },
    { label: 'Conversion', value: '24%', change: '+2%', icon: TrendingUp, color: 'orange' },
  ]

  const recentCars = [...cars].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4).map(car => ({
    name: car.name,
    price: `$${Number(car.price).toLocaleString()}`,
    status: car.status,
    date: car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'N/A',
  }))

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

      <div className="flex mt-19">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen border-r border-gray-200 bg-white">
          <div className="p-6 space-y-2">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'inventory', label: 'Inventory' },
              { key: 'inquiries', label: 'Inquiries' },
              { key: 'analytics', label: 'Analytics' },
              { key: 'settings', label: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all capitalize duration-300 ${activeTab === tab.key ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm hover:translate-x-1 cursor-pointer'}`}
              >
                {tab.label}
              </button>
            ))}
              <Link
                href="/admin/adminProfile"
              className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm hover:translate-x-1"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-light capitalize text-gray-900">{activeTab}</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back, Administrator</p>
              </div>
              <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg cursor-pointer transition-all group/bell">
                <Bell className="w-5 h-5 group-hover/bell:animate-bounce" />
                <span className="hidden sm:inline font-medium">Notifications</span>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              </div>
                <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-600 hover:rotate-90 transition-all duration-500" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg cursor-pointer transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
            </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-8">
                 {/* Stats */}
                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {stats.map((stat, idx) => (
                     <div key={idx} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-red-600/10 hover:border-red-200 hover:-translate-y-1 transition-all duration-300 group/stat">
                       <div className="flex items-center justify-between mb-4">
                         <span className="text-sm text-gray-600 font-medium group-hover/stat:text-red-600/70 transition-colors">{stat.label}</span>
                         <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover/stat:bg-red-100 group-hover/stat:scale-110 transition-all">
                           <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                         </div>
                       </div>
                       <div className="flex items-end justify-between">
                         <span className="text-3xl font-bold text-gray-900 group-hover/stat:text-red-600 transition-colors">{stat.value}</span>
                         <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                       </div>
                     </div>
                   ))}
                 </div>

                 {/* Recent Activity */}
                 <div className="grid lg:grid-cols-2 gap-8">
                   {/* Recent Cars */}
                   <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                     <div className="p-6 border-b border-gray-200 bg-gray-50/50">
                       <h3 className="font-semibold text-lg text-gray-900">Recently Added Cars</h3>
                     </div>
                      <div className="divide-y divide-gray-100">
                        {recentCars.map((car, idx) => (
                          <div key={idx} className="p-4 flex items-center justify-between hover:bg-red-50/50 hover:pl-6 transition-all duration-300 group/car">
                            <div>
                              <div className="font-medium text-gray-900 group-hover/car:text-red-600 transition-colors">{car.name}</div>
                              <div className="text-sm text-gray-500">{car.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-red-600">{car.price}</div>
                              <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${car.status === 'Available' ? 'bg-green-100 text-green-700' : car.status === 'Reserved' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{car.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Inquiries */}
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="p-6 border-b border-gray-200 bg-gray-50/50">
                        <h3 className="font-semibold text-lg text-gray-900">Latest Inquiries</h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {(inquiries.slice(0, 4)).map((inq, idx) => (
                          <div key={inq._id || idx} className="p-4 flex items-center justify-between hover:bg-red-50/50 hover:pl-6 transition-all duration-300 group/inq">
                            <div>
                              <div className="font-medium text-gray-900 group-hover/inq:text-red-600 transition-colors">{inq.firstName} {inq.lastName}</div>
                              <div className="text-sm text-gray-500">{inq.carModel}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">{inq.email}</div>
                              <div className="text-xs text-blue-600 mt-1 capitalize">{inq.status}</div>
                            </div>
                          </div>
                        ))}
                       </div>
                    </div>
                  </div>
                </div>
              )}

            {activeTab === 'inventory' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Inventory Management</h3>
                <p className="text-gray-500 max-w-md mx-auto">Full CRUD operations for managing your vehicle inventory will be available here.</p>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Car</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {inquiries.map((inq, idx) => (
                        <tr key={inq._id || idx} className="hover:bg-red-50/50 transition-all duration-300 border-l-4 border-transparent hover:border-red-600">
                          <td className="px-6 py-4 font-medium text-gray-900 relative group/row">
                            {inq.firstName} {inq.lastName}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover/row:w-full transition-all duration-300"></span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 group-hover/row:text-gray-900 transition-colors">{inq.email}</td>
                          <td className="px-6 py-4 text-gray-900 group-hover/row:text-red-600 transition-colors">{inq.carModel}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200 group-hover/row:bg-red-100 group-hover/row:text-red-700 transition-all capitalize">{inq.status}</span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-xs bg-white text-gray-900 border border-gray-300 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white hover:border-red-600 font-semibold transition-all shadow-sm hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-0.5">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Analytics Dashboard</h3>
                <p className="text-gray-500 max-w-md mx-auto">Detailed analytics and reporting tools will be available here.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Settings</h3>
                <p className="text-gray-500 max-w-md mx-auto">System configuration and preferences will be managed here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
