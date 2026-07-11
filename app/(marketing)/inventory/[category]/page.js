'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowRight,
  Car,
  ChevronLeft,
  Gauge,
  ShieldCheck,
  Sparkles,
  Flame,
  Gem,
  History,
  BatteryCharging,
} from 'lucide-react'

const categoryOptions = [
  {
    title: 'Sports',
    slug: 'sports',
    description: 'Precision engineering meets driving excitement. Our sports collection delivers balanced performance, razor-sharp handling, and a connection between driver and machine.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    accent: 'from-red-500 to-orange-600',
    accentText: 'text-red-600',
    accentBorder: 'border-red-200',
    accentBg: 'bg-red-50',
    icon: Gauge,
    highlights: ['Track-ready handling', 'Precision engineering', 'Driver-focused cockpit'],
  },
  {
    title: 'Supercar',
    slug: 'supercar',
    description: 'Extreme performance wrapped in exotic design. These are the pinnacle of automotive ambition—limited, loud, and unapologetically extraordinary.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&auto=format&fit=crop&q=80',
    accent: 'from-purple-600 to-fuchsia-600',
    accentText: 'text-purple-600',
    accentBorder: 'border-purple-200',
    accentBg: 'bg-purple-50',
    icon: Flame,
    highlights: ['Carbon-fiber construction', 'Mid-engine layout', '0-60 under 3 seconds'],
  },
  {
    title: 'Luxury',
    slug: 'luxury',
    description: 'Refined interiors, whisper-quiet cabins, and craftsmanship that feels more like bespoke tailoring than automobile manufacturing.',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&auto=format&fit=crop&q=80',
    accent: 'from-amber-500 to-yellow-600',
    accentText: 'text-amber-600',
    accentBorder: 'border-amber-200',
    accentBg: 'bg-amber-50',
    icon: Gem,
    highlights: ['Hand-stitched interiors', 'Executive lounge seating', 'Concierge ownership'],
  },
  {
    title: 'Classic',
    slug: 'classic',
    description: 'Timeless machines with heritage in every curve. Each classic car carries provenance, patina, and a story worth preserving for generations.',
    image: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    accent: 'from-stone-500 to-stone-700',
    accentText: 'text-stone-600',
    accentBorder: 'border-stone-200',
    accentBg: 'bg-stone-50',
    icon: History,
    highlights: ['Documented provenance', 'Rotating exhibition display', 'Storage & concierge care'],
  },
  {
    title: 'Electric',
    slug: 'electric',
    description: 'Instant torque, zero emissions, and futuristic design. Experience the next era of performance where sustainability and speed coexist.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&auto=format&fit=crop&q=80',
    accent: 'from-emerald-500 to-teal-600',
    accentText: 'text-emerald-600',
    accentBorder: 'border-emerald-200',
    accentBg: 'bg-emerald-50',
    icon: BatteryCharging,
    highlights: ['500+ mile range', 'Over-the-air updates', 'Autonomous-ready hardware'],
  },
]

const iconMap = {
  Gauge,
  Flame,
  Gem,
  History,
  BatteryCharging,
}

export default function CategoryViewPage() {
  const params = useParams()
  const router = useRouter()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentCategory = useMemo(() => {
    return categoryOptions.find((option) => option.slug === params?.category) || categoryOptions[0]
  }, [params?.category])

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`/api/cars?category=${encodeURIComponent(currentCategory.title)}`)
        if (!res.ok) throw new Error('Failed to load cars')
        const data = await res.json()
        setCars(data.data || [])
      } catch (err) {
        setError(err.message || 'Unable to load this category right now.')
      } finally {
        setLoading(false)
      }
    }

    if (currentCategory?.title) {
      fetchCars()
    }
  }, [currentCategory?.title])

  const CategoryIcon = iconMap[currentCategory.icon?.name] || Car

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans mt-17">
      <section className="relative bg-gray-50 border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Inventory
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center pb-16">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${currentCategory.accentBorder} ${currentCategory.accentBg} ${currentCategory.accentText} text-xs font-semibold uppercase tracking-wider mb-5`}>
                <Sparkles className="w-3.5 h-3.5" />
                {currentCategory.title}
              </div>
              <h1 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
                {currentCategory.title} <span className={`bg-gradient-to-r ${currentCategory.accent} bg-clip-text text-transparent font-semibold`}>Collection</span>
              </h1>
              <p className="text-gray-600 leading-relaxed mb-8">
                {currentCategory.description}
              </p>

              <div className="grid grid-cols-3 gap-3">
                {currentCategory.highlights?.map((highlight) => (
                  <div key={highlight} className={`flex items-center gap-2.5 rounded-xl border ${currentCategory.accentBorder} ${currentCategory.accentBg} px-3.5 py-3`}>
                    <CategoryIcon className={`w-4 h-4 ${currentCategory.accentText}`} />
                    <span className="text-xs font-medium text-gray-700 leading-tight">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl overflow-hidden border ${currentCategory.accentBorder} bg-white shadow-sm`}>
              <img src={currentCategory.image} alt={currentCategory.title} className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600">{error}</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No vehicles available in this category yet.
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-light text-gray-900">
                    {currentCategory.title} <span className={`bg-gradient-to-r ${currentCategory.accent} bg-clip-text text-transparent font-semibold`}>Vehicles</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{cars.length} vehicle{cars.length === 1 ? '' : 's'} available</p>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {cars.map((car) => (
                  <div key={car._id} className={`group rounded-2xl border ${currentCategory.accentBorder} bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300`}>
                    <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-gray-100">
                      <img src={car.image || car.images?.[0] || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80'} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${car.status === 'Available' ? 'bg-green-100 text-green-700' : car.status === 'Reserved' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {car.status}
                      </span>
                      <span className={`font-semibold text-sm ${currentCategory.accentText}`}>${Number(car.price).toLocaleString()}</span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-1.5">{car.name}</h2>
                    <p className="text-gray-500 text-sm mb-4">{car.make} • {car.model} • {car.year}</p>

                    <div className="grid grid-cols-2 gap-2.5 text-sm text-gray-600 mb-5">
                      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                        <Gauge className="w-4 h-4 text-red-600" />
                        {car.miles}
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                        <ShieldCheck className="w-4 h-4 text-red-600" />
                        {car.condition}
                      </div>
                    </div>

                    <Link href={`/car/${car._id}`} className={`inline-flex items-center justify-center gap-2 rounded-xl ${currentCategory.accentBg} ${currentCategory.accentText} px-4 py-2.5 text-sm font-semibold hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95`}>
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <footer className={`py-10 px-4 sm:px-6 lg:px-8 border-t ${currentCategory.accentBorder} bg-white`}>
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className={`w-7 h-7 bg-gradient-to-br ${currentCategory.accent} rounded-lg flex items-center justify-center`}>
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-widest uppercase text-gray-900">Elite Motors</span>
          </Link>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <Link href="/inventory" className={`${currentCategory.accentText} hover:opacity-80 transition`}>Inventory</Link>
            <Link href="/contact" className={`${currentCategory.accentText} hover:opacity-80 transition`}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
