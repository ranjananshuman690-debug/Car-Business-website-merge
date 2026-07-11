'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getAuthHeaders } from '@/lib/auth'

export default function ContactPage() {
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carModel: '',
    date: '',
    time: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user && !isLoading) {
      window.location.href = '/login'
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Something went wrong. Please try again.' }))
        alert(errorData.message || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      const data = await res.json()
      if (data.success) {
        alert('Thank you for contacting Elite Motors. Our specialist will get back to you within 24 hours.')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', carModel: '', date: '', time: '', message: '' })
      } else {
        alert(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/80 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-light leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
            GET IN <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold italic">TOUCH</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed animate-fade-in-up delay-100">
            Whether you are looking for a specific vehicle or want to discuss your collection goals, our team is here to help you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-6 text-gray-900">CONTACT <span className="text-red-600">INFO</span></h2>
                <div className="w-20 h-1 bg-red-600 rounded-full mb-8" />
              </div>

              <div className="space-y-6">
                <div className="car-card flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-red-200 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/card">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 group-hover/card:bg-red-50 group-hover/card:border-red-200 transition-all shadow-sm group-hover/card:scale-110">
                    <MapPin className="w-6 h-6 text-red-600 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 group-hover/card:text-red-700 transition-colors">Showroom</h3>
                    <p className="text-gray-600 text-sm">90210 Beverly Hills, CA</p>
                    <p className="text-gray-500 text-sm">California, USA</p>
                  </div>
                </div>

                <div className="car-card flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-red-200 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/card">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 group-hover/card:bg-red-50 group-hover/card:border-red-200 transition-all shadow-sm group-hover/card:scale-110">
                    <Phone className="w-6 h-6 text-red-600 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 group-hover/card:text-red-700 transition-colors">Phone</h3>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Mon-Sat: 10AM - 7PM</p>
                  </div>
                </div>

                <div className="car-card flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-red-200 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/card">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 group-hover/card:bg-red-50 group-hover/card:border-red-200 transition-all shadow-sm group-hover/card:scale-110">
                    <Mail className="w-6 h-6 text-red-600 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 group-hover/card:text-red-700 transition-colors">Email</h3>
                    <p className="text-gray-600 text-sm">sales@elitemotors.com</p>
                    <p className="text-gray-500 text-sm">support@elitemotors.com</p>
                  </div>
                </div>

                <div className="car-card flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-red-200 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-300 group/card">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 group-hover/card:bg-red-50 group-hover/card:border-red-200 transition-all shadow-sm group-hover/card:scale-110">
                    <Clock className="w-6 h-6 text-red-600 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 group-hover/card:text-red-700 transition-colors">Business Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-500 text-sm">Saturday: 10AM - 7PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">Interested Car</label>
                    <select
                      required
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                    >
                      <option value="">Select a vehicle</option>
                      <option value="Porsche 911 GT3 RS">Porsche 911 GT3 RS</option>
                      <option value="Ferrari F8 Tributo">Ferrari F8 Tributo</option>
                      <option value="Lamborghini Huracan Evo">Lamborghini Huracan Evo</option>
                      <option value="McLaren 720S Spider">McLaren 720S Spider</option>
                      <option value="Mercedes AMG GT Black">Mercedes AMG GT Black</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700 font-medium">Preferred Time</label>
                    <input
                      type="time"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Tell us about your dream car..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/40 inline-flex items-center justify-center gap-2 relative overflow-hidden group/submit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700"></span>
                  <span className="relative z-10">{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Prefer a Direct Call?</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Our specialists are available during business hours to assist you.
          </p>
          <a href="tel:+15551234567" className="btn btn-primary px-8 py-4 inline-flex items-center gap-2">
            <Phone className="w-5 h-5" />
            +1 (555) 123-4567
          </a>
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
            <Link href="/services" className="hover:text-gray-700 transition">Services</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
