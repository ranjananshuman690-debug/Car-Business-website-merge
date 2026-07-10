'use client'

import Link from 'next/link'
import {
  Car,
  ShieldCheck,
  Gauge,
  Truck,
  FileCheck,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: ShieldCheck,
      title: 'Certified Pre-Owned',
      description: 'Every vehicle passes our 200-point inspection with complete documentation and service history verification.',
      features: ['200-point inspection', 'Full vehicle history', 'Certified authenticity', 'Warranty included'],
    },
    {
      icon: Gauge,
      title: 'Performance Tuning',
      description: 'Our in-house specialists can optimize your vehicle for both track and street performance.',
      features: ['ECU remapping', 'Suspension tuning', 'Exhaust systems', 'Brake upgrades'],
    },
    {
      icon: Truck,
      title: 'Global Delivery',
      description: 'White-glove worldwide shipping with fully insured transport and real-time tracking.',
      features: ['Worldwide shipping', 'Fully insured', 'Real-time tracking', 'Door-to-door service'],
    },
    {
      icon: FileCheck,
      title: 'Financing Solutions',
      description: 'Tailored financing options through our network of premium lending partners.',
      features: ['Competitive rates', 'Flexible terms', 'Quick approval', 'Global currency options'],
    },
    {
      icon: Wrench,
      title: 'Maintenance & Service',
      description: 'OEM-trained technicians using only genuine parts for all maintenance needs.',
      features: ['OEM certified', 'Genuine parts', 'Express service', 'Extended warranties'],
    },
    {
      icon: Car,
      title: 'Consignment Services',
      description: 'Let us sell your vehicle through our global network of verified collectors and enthusiasts.',
      features: ['Global exposure', 'Professional photography', 'Verified buyers', 'Secure transaction'],
    },
  ]

  const process = [
    { step: '01', title: 'Consultation', description: 'Share your preferences and requirements with our specialists.' },
    { step: '02', title: 'Curation', description: 'We hand-select vehicles matching your exact specifications.' },
    { step: '03', title: 'Verification', description: 'Complete inspection, history check, and authenticity certification.' },
    { step: '04', title: 'Delivery', description: 'White-glove delivery to your doorstep, anywhere in the world.' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/80 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-red-600 text-sm font-medium mb-6 shadow-sm">
              <Wrench className="w-4 h-4" />
              PREMIUM SERVICES
            </div>
            <h1 className="text-5xl sm:text-6xl font-light leading-[1.1] tracking-tight mb-6 text-gray-900">
              OUR <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold italic">SERVICES</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Beyond selling exceptional cars, we offer a complete suite of services designed to enhance your ownership experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">What We Offer</p>
            <h2 className="text-4xl font-light mb-4 text-gray-900">COMPLETE <span className="text-red-600">AUTOMOTIVE</span> SOLUTIONS</h2>
            <div className="w-20 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 border border-gray-200">
                  <service.icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">How It Works</p>
            <h2 className="text-4xl font-light mb-4 text-gray-900">THE <span className="text-red-600">ELITE</span> EXPERIENCE</h2>
            <div className="w-20 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="text-6xl font-light text-red-600/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {idx < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900">
            Need a <span className="text-red-600 italic">Custom</span> Solution?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Our team is ready to create a personalized package tailored to your unique automotive needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/inventory" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-900 hover:bg-gray-50 transition-all inline-flex items-center gap-2">
              View Inventory
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
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
            <Link href="/contact" className="hover:text-gray-700 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
