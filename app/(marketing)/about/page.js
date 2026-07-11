'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Car,
  ShieldCheck,
  Gauge,
  Users,
  Award,
  Globe,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  const values = [
    {
      icon: ShieldCheck,
      title: 'Certified Authentic',
      description: 'Every vehicle undergoes rigorous verification of its history, provenance, and mechanical condition.',
    },
    {
      icon: Gauge,
      title: 'Performance Driven',
      description: 'We only select cars that meet our exacting standards for driving dynamics and engineering excellence.',
    },
    {
      icon: Users,
      title: 'Client First',
      description: 'Your passion drives us. We provide white-glove service tailored to each collector\'s unique needs.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'With clients in over 40 countries, we offer worldwide shipping and concierge ownership services.',
    },
  ]

  const team = [
    { name: 'James Wilson', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' },
    { name: 'Sarah Chen', role: 'Head of Acquisitions', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80' },
    { name: 'Michael Torres', role: 'Chief Mechanic', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
    { name: 'Emma Davis', role: 'Client Relations', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80' },
  ]

  const stats = [
    { number: '25+', label: 'Years Experience' },
    { number: '2,500+', label: 'Cars Delivered' },
    { number: '40+', label: 'Countries Served' },
    { number: '98%', label: 'Client Satisfaction' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/80 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-red-600 text-sm font-medium mb-6 shadow-sm">
              <Award className="w-4 h-4" />
              ESTABLISHED 1998
            </div>
            <h1 className="text-5xl sm:text-6xl font-light leading-[1.1] tracking-tight mb-6 text-gray-900">
              ABOUT <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold italic">ELITE MOTORS</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl">
              For over 25 years, Elite Motors has been the premier destination for collectors and enthusiasts seeking the world's most exceptional automobiles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                <img
                  src="https://media.istockphoto.com/id/2280757601/photo/saleswoman-holding-tablet-in-modern-car-showroom.jpg?s=1024x1024&w=is&k=20&c=tazNbYKte6ATDQ0G-fzJ3rh9YtuusvBbasT4xEXI0g0="
                  alt="Elite Motors Showroom"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600/20 rounded-2xl -z-10" />
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">Our Story</p>
                <h2 className="text-4xl font-light mb-6 text-gray-900">
                  THE <span className="text-red-600">PASSION</span> BEHIND THE WHEELS
                </h2>
                <div className="w-20 h-1 bg-red-600 rounded-full mb-8" />
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1998 in the heart of Beverly Hills, Elite Motors began with a simple philosophy: connect passionate collectors with the world's most extraordinary automobiles.
                </p>
                <p>
                  What started as a small showroom has grown into a global presence, serving clients across 40+ countries. Our team of expert curators, mechanics, and client advisors share an unwavering commitment to automotive excellence.
                </p>
                <p>
                  Every vehicle in our collection tells a story. From rare Ferrari classics to cutting-edge hypercars, we hand-select each automobile for its provenance, condition, and the experience it delivers.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all">
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">Why Choose Us</p>
            <h2 className="text-4xl font-light mb-4 text-gray-900">OUR <span className="text-red-600">VALUES</span></h2>
            <div className="w-20 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                  <value.icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">By The Numbers</p>
            <h2 className="text-4xl font-light mb-4 text-gray-900">OUR <span className="text-red-600">IMPACT</span></h2>
            <div className="w-20 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="text-5xl font-light text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">The Team</p>
            <h2 className="text-4xl font-light mb-4 text-gray-900">MEET THE <span className="text-red-600">EXPERTS</span></h2>
            <div className="w-20 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900">
            Ready to Find Your <span className="text-red-600 italic">Dream Car</span>?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Let our team of experts guide you through our exclusive collection.
          </p>
          <Link href="/inventory" className="btn btn-primary px-10 py-4 inline-flex items-center gap-2">
            Browse Collection <ArrowRight className="w-5 h-5" />
          </Link>
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
