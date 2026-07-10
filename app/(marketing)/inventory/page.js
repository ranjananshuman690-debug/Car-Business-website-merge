'use client'

import { Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, ChevronDown, ArrowRight, Car, Fuel, Gauge, ShieldCheck } from 'lucide-react'

const fetcher = (url) => fetch(url).then((res) => res.json())

const categoryOptions = [
  {
    title: 'Sports',
    slug: 'sports',
    description: 'Balanced performance cars built for handling and driving excitement.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Supercar',
    slug: 'supercar',
    description: 'Extreme performance, exotic styling, and exclusive engineering.',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Luxury',
    slug: 'luxury',
    description: 'Premium comfort and superior craftsmanship for a refined ride.',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Classic',
    slug: 'classic',
    description: 'Iconic machines with a timeless presence and collectible appeal.',
    image: 'https://media.istockphoto.com/id/181072841/photo/black-sports-car.jpg?s=1024x1024&w=is&k=20&c=wus0NdF8B_3MxWvbsbWQe3Qxl8sAPVVtIXtFOup-dNc=',
  },
  {
    title: 'Electric',
    slug: 'electric',
    description: 'Modern EVs with instant torque, efficiency, and futuristic design.',
    image: 'https://media.istockphoto.com/id/1291903867/photo/electric-sports-car-struck-by-electrical-lightning-from-coil.jpg?s=1024x1024&w=is&k=20&c=oTechKNsGulqxGgDLRy2Rv8Ru-BFbFuKAMClP3K3fmQ=',
  },
]

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-gray-900">Loading inventory...</div>}>
      <InventoryPageContent />
    </Suspense>
  )
}

function InventoryPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filters, setFilters] = useState({ make: '', model: '', category: '', yearFrom: '', yearTo: '' })
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!searchParams) return

    const urlFilters = {
      make: searchParams.get('make') || '',
      model: searchParams.get('model') || '',
      category: searchParams.get('category') || '',
      yearFrom: searchParams.get('yearFrom') || '',
      yearTo: searchParams.get('yearTo') || '',
    }

    setFilters(urlFilters)
    if (urlFilters.make || urlFilters.model || urlFilters.category || urlFilters.yearFrom || urlFilters.yearTo) {
      setShowResults(true)
    }
  }, [searchParams])

  const buildUrl = () => {
    const params = new URLSearchParams()
    if (filters.make) params.append('make', filters.make)
    if (filters.model) params.append('model', filters.model)
    if (filters.category) params.append('category', filters.category)
    if (filters.yearFrom) params.append('yearFrom', filters.yearFrom)
    if (filters.yearTo) params.append('yearTo', filters.yearTo)
    const qs = params.toString()
    return `/api/cars${qs ? `?${qs}` : ''}`
  }

  const { data, error, isLoading } = useSWR(
    showResults ? buildUrl() : '/api/cars',
    fetcher
  )

  const cars = data?.data || []
  const count = data?.count || 0

  const categoryCounts = cars.reduce((acc, car) => {
    if (!car.category) return acc
    acc[car.category] = (acc[car.category] || 0) + 1
    return acc
  }, {})

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (filters.make) params.append('make', filters.make)
    if (filters.model) params.append('model', filters.model)
    if (filters.category) params.append('category', filters.category)
    if (filters.yearFrom) params.append('yearFrom', filters.yearFrom)
    if (filters.yearTo) params.append('yearTo', filters.yearTo)

    const queryString = params.toString()
    router.push(`/inventory${queryString ? `?${queryString}` : ''}`)
    setShowResults(true)
  }

  const formatCar = (car) => ({
    id: car._id,
    name: car.name,
    year: car.year,
    miles: car.miles,
    cond: car.condition,
    price: `$${car.price.toLocaleString()}`,
    status: car.status,
    make: car.make,
    model: car.model,
    category: car.category || 'Unknown',
  })

  const displayCars = showResults ? cars.map(formatCar) : []

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/80 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-red-600 text-sm font-medium mb-6 shadow-sm animate-fade-in-up">
            <Car className="w-4 h-4" />
            {(showResults ? count : cars.length || count)} VEHICLES AVAILABLE
          </div>
          <h1 className="text-5xl sm:text-6xl font-light leading-[1.1] tracking-tight mb-6 animate-fade-in-up delay-100 text-gray-900">
            CURRENT <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold italic">INVENTORY</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed animate-fade-in-up delay-200">
            Browse our handpicked selection of investment-grade automobiles.
          </p>
        </div>
      </section>

      {/* Inventory */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Category Cards */}
          <div className="mb-14">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold">Browse by category</p>
              <h2 className="text-4xl font-light mt-4 text-gray-900">Find the right car style for you</h2>
              <p className="max-w-2xl mx-auto text-gray-600 mt-4">
                Explore our collection by category. Each category contains curated cars with full details, images, and pricing.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {categoryOptions.map((category) => (
                <Link
                  key={category.title}
                  href={`/inventory/${category.slug}`}
                  className={`group overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 ${filters.category === category.title ? 'border-red-600 shadow-2xl shadow-red-600/10' : 'border-gray-200 hover:border-red-300 hover:shadow-xl hover:shadow-red-600/10'}`}
                >
                  <div className="relative h-40 overflow-hidden rounded-3xl mb-4">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">
                      {category.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>{categoryCounts[category.title] || 0} cars</span>
                    <span className="text-red-600">View</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Filters */}
          <form onSubmit={handleSearch} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none text-gray-700"
                value={filters.make}
                onChange={(e) => setFilters({ ...filters, make: e.target.value })}
              >
                <option value="">SELECT MAKE</option>
                <option value="porsche">Porsche</option>
                <option value="ferrari">Ferrari</option>
                <option value="lamborghini">Lamborghini</option>
                <option value="mclaren">McLaren</option>
              </select>
              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none text-gray-700"
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
              >
                <option value="">SELECT MODEL</option>
                <option value="911">911 Series</option>
                <option value="f8">F8 Tributo</option>
                <option value="huracan">Huracan</option>
                <option value="720s">720S</option>
              </select>
              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none text-gray-700"
                value={filters.yearFrom}
                onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
              >
                <option value="">YEAR FROM</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none text-gray-700"
                value={filters.yearTo}
                onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
              >
                <option value="">YEAR TO</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none text-gray-700"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">SELECT CATEGORY</option>
                <option value="Sports">Sports</option>
                <option value="Supercar">Supercar</option>
                <option value="Luxury">Luxury</option>
                <option value="Classic">Classic</option>
                <option value="Electric">Electric</option>
              </select>
              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </form>

          <div className="flex justify-center mb-12">
            <button
              onClick={handleSearch}
              className="btn btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full relative overflow-hidden group/search"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/search:translate-x-full transition-transform duration-700"></span>
              <Search className="w-5 h-5" />
              <span className="relative z-10">SEARCH INVENTORY</span>
            </button>
          </div>

           {/* Cars Table */}
           {showResults && (
             <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-fade-in shadow-sm">
               {(error || isLoading) ? (
                 <div className="p-12 text-center text-gray-500">
                   {isLoading ? 'Loading inventory...' : 'Failed to load inventory. Please try again.'}
                 </div>
               ) : displayCars.length === 0 ? (
                 <div className="p-12 text-center text-gray-500">
                   No vehicles match your criteria. Try adjusting your filters.
                 </div>
               ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Vehicle</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Year</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Mileage</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Condition</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Price</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                       <tbody className="divide-y divide-gray-100">
                         {displayCars.map((car, index) => (
                            <tr key={index} className="hover:bg-red-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-red-600">
                             <td className="px-6 py-4">
                               <div className={`w-3 h-3 rounded-full ${car.status === 'Available' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:animate-pulse' : car.status === 'Reserved' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                             </td>
                             <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-red-600 transition-colors relative">
                               {car.name}
                               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                             </td>
                             <td className="px-6 py-4 text-gray-600 group-hover:text-gray-900 transition-colors">{car.year}</td>
                             <td className="px-6 py-4 text-gray-600 group-hover:text-gray-900 transition-colors">{car.miles}</td>
                             <td className="px-6 py-4">
                               <span className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-200 text-gray-700 group-hover:bg-red-100 group-hover:text-red-700 group-hover:border-red-200 transition-all">{car.cond}</span>
                             </td>
                             <td className="px-6 py-4">
                               <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">{car.category}</span>
                             </td>
                             <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-red-600 transition-colors">{car.price}</td>
                             <td className="px-6 py-4">
                               <Link href={`/car/${car.id}`} className="btn btn-outline text-xs px-3 py-1.5 inline-block">
                                 View Details
                               </Link>
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-8 flex justify-center border-t border-gray-200">
                    <Link href="/contact" className="btn btn-primary inline-flex items-center gap-2 px-6 py-3">
                      INQUIRE ABOUT A VEHICLE <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-widest uppercase text-gray-900">Elite Motors</span>
          </Link>
          <p className="text-gray-500 text-sm mb-6">
            &copy; 2024 Elite Motors. All rights reserved. Beverly Hills, CA.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition">Home</Link>
            <Link href="/about" className="hover:text-gray-700 transition">About</Link>
            <Link href="/contact" className="hover:text-gray-700 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
