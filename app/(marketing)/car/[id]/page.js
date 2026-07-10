'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Car,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Fuel,
  ShieldCheck,
  Calendar,
  ArrowRight
} from 'lucide-react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function CarDetailPage() {
  const params = useParams()
  const carId = params?.id
  const [selectedImage, setSelectedImage] = useState(0)

  const { data, error, isLoading } = useSWR(
    carId ? `/api/cars/${carId}` : null,
    fetcher
  )

  const { data: allCarsData } = useSWR(
    carId ? '/api/cars' : null,
    fetcher
  )

  const car = data?.data

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading car details</div>
          <Link href="/inventory" className="text-red-600 hover:underline">Back to Inventory</Link>
        </div>
      </div>
    )
  }

  if (isLoading || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const images = car.images?.length > 0 ? car.images : [car.image].filter(Boolean)
  if (images.length === 0) images.push('https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80')

  const similarCars = (allCarsData?.data || []).filter(c => c._id !== car._id).slice(0, 3)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link href="/inventory" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Inventory
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 group/image relative overflow-hidden">
                <img
                  src={images[selectedImage % images.length]}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === idx ? 'border-red-600 opacity-100 shadow-lg shadow-red-600/30 scale-105' : 'border-gray-200 opacity-70 hover:border-red-300 hover:opacity-100 hover:shadow-md'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${car.status === 'Available' ? 'bg-green-100 text-green-700 border border-green-200' : car.status === 'Reserved' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                    {car.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">{car.condition}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">{car.category || 'Category'}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-light mb-2 text-gray-900">{car.name}</h1>
                <p className="text-red-600 text-xl font-semibold">${Number(car.price).toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/spec">
                  <Gauge className="w-6 h-6 text-red-600 mb-2 group-hover/spec:scale-110 group-hover/spec:rotate-12 transition-transform" />
                  <div className="text-sm text-gray-500 group-hover/spec:text-red-600/70 transition-colors">Mileage</div>
                  <div className="font-bold text-gray-900">{car.miles}</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/spec">
                  <Calendar className="w-6 h-6 text-red-600 mb-2 group-hover/spec:scale-110 group-hover/spec:rotate-12 transition-transform" />
                  <div className="text-sm text-gray-500 group-hover/spec:text-red-600/70 transition-colors">Year</div>
                  <div className="font-bold text-gray-900">{car.year}</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/spec">
                  <Car className="w-6 h-6 text-red-600 mb-2 group-hover/spec:scale-110 group-hover/spec:rotate-12 transition-transform" />
                  <div className="text-sm text-gray-500 group-hover/spec:text-red-600/70 transition-colors">Make</div>
                  <div className="font-bold text-gray-900">{car.make}</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/spec">
                  <Fuel className="w-6 h-6 text-red-600 mb-2 group-hover/spec:scale-110 group-hover/spec:rotate-12 transition-transform" />
                  <div className="text-sm text-gray-500 group-hover/spec:text-red-600/70 transition-colors">Condition</div>
                  <div className="font-bold text-gray-900">{car.condition}</div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Certified Authentic</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This vehicle has passed our comprehensive 200-point inspection and comes with complete documentation, service history, and a certified authenticity report.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="flex-1 bg-white text-red-600 border-2 border-red-600 text-center font-bold py-4 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-600/10 hover:shadow-xl hover:shadow-red-600/30 transform hover:-translate-y-1 relative overflow-hidden group/inquire inline-flex items-center justify-center gap-2">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/inquire:translate-x-full transition-transform duration-700"></span>
                  INQUIRE NOW <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="tel:+15551234567" className="flex-1 border border-gray-300 text-center font-bold py-4 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all text-gray-700 inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gray-900/10 transform hover:-translate-y-0.5">
                  <Phone className="w-4 h-4" />
                  CALL +1 (555) 123-4567
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Description */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light mb-6 text-gray-900">VEHICLE <span className="text-red-600">OVERVIEW</span></h2>
            <div className="w-20 h-1 bg-red-600 rounded-full mb-8" />
            <p className="text-gray-600 leading-relaxed mb-6">
              {car.description || `The ${car.name} represents the pinnacle of automotive engineering. With its stunning design, breathtaking performance, and uncompromising attention to detail, this vehicle delivers an experience like no other.`}
            </p>
            <p className="text-gray-500 leading-relaxed">
              Every aspect of this automobile has been meticulously crafted to provide the ultimate driving experience. From the powerful engine to the luxurious interior, no detail has been overlooked.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-light mb-6 text-gray-900">SPECIFICATIONS</h3>
            {[
              { label: 'Engine', value: car.engine || 'N/A' },
              { label: 'Power', value: car.power || 'N/A' },
              { label: 'Transmission', value: car.transmission || 'N/A' },
              { label: 'Mileage', value: car.miles || 'N/A' },
              { label: 'Year', value: car.year || 'N/A' },
              { label: 'Condition', value: car.condition || 'N/A' },
            ].map((spec, idx) => (
              <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600">{spec.label}</span>
                <span className="font-bold text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Cars */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-light mb-2 text-gray-900">SIMILAR <span className="text-red-600">VEHICLES</span></h2>
              <div className="w-20 h-1 bg-red-600 rounded-full" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCars.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                No similar vehicles available at this time.
              </div>
            ) : (
              similarCars.map((c, idx) => (
                <Link href={`/car/${c._id}`} key={c._id} className="group block">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4 border border-gray-200 group-hover:border-red-200 transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-red-600/10 group-hover:-translate-y-2 duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img src={c.image || c.images?.[0] || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80'} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{c.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 group-hover:text-gray-900 transition-colors">{c.year}</span>
                    <span className="text-red-600 font-bold group-hover:scale-110 transition-transform">${Number(c.price).toLocaleString()}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
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
            <Link href="/inventory" className="hover:text-gray-700 transition">Inventory</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
