'use client';

import { useState } from 'react';
import useSWR from 'swr';
import {
  Car,
  Calendar,
  MapPin,
  Search,
  ChevronDown,
  Clock,
  Gauge,
  Fuel,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { getAuthHeaders } from '@/lib/auth';

const categoryOptions = [
  {
    title: 'Sports',
    description: 'High-performance vehicles built for precision handling and speed.',
    image: 'https://media.istockphoto.com/id/147461719/photo/sports-car.jpg?s=1024x1024&w=is&k=20&c=WUlgFqgW8Awh4CuPc5FJZCvVZ7GeDWG4AdypcDs6-FA=',
  },
  {
    title: 'Supercar',
    description: 'Exotic machines with peak power, head-turning design, and exclusivity.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Luxury',
    description: 'Refined interiors and premium technology for the ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&auto=format&fit=crop&q=80',
  },
]

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CarCollectionPage() {
  const { user, isLoading } = useAuth();
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carModel: '',
    date: '',
    time: ''
  });

  const [searchFilters, setSearchFilters] = useState({
    make: '',
    model: '',
    yearFrom: '',
    yearTo: ''
  });

  const [showResults, setShowResults] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({ success: null, message: '' });

  const buildCarsUrl = () => {
    if (!showInventory) return null;
    const params = new URLSearchParams();
    if (searchFilters.make) params.append('make', searchFilters.make);
    if (searchFilters.model) params.append('model', searchFilters.model);
    if (searchFilters.yearFrom) params.append('yearFrom', searchFilters.yearFrom);
    if (searchFilters.yearTo) params.append('yearTo', searchFilters.yearTo);
    const qs = params.toString();
    return `/api/cars${qs ? `?${qs}` : ''}`;
  };

  const { data: cars, error, isLoading: carsLoading } = useSWR(
    buildCarsUrl(),
    fetcher
  );

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user && !isLoading) {
      window.location.href = '/login';
      return;
    }
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingForm),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save booking');
      }

      setBookingStatus({ success: true, message: 'Booking submitted successfully. We will contact you shortly.' });
      setShowResults(true);
      setBookingForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        carModel: '',
        date: '',
        time: '',
      });
    } catch (error) {
      setBookingStatus({ success: false, message: error.message || 'Unable to submit booking.' });
    }

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowInventory(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/80 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-red-600 text-sm font-medium shadow-sm">
              <Star className="w-4 h-4 fill-current" />
              Premium Luxury Collection
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-gray-900">
              Experience The<br />
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold italic">
                Ultimate Drive
              </span>
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-xl">
              Discover our curated selection of the world&apos;s finest automobiles.
              From vintage classics to modern supercars, we provide an exclusive
              ownership experience tailored to your passion.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#inventory"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl transition-all font-medium shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 transform hover:-translate-y-1 hover:scale-105 inline-flex items-center gap-2 text-white relative overflow-hidden group/btn"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                VIEW COLLECTION <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#book"
                className="px-8 py-4 border border-gray-300 hover:border-gray-900 rounded-xl transition-all font-medium hover:bg-gray-900 hover:text-white text-gray-700 transform hover:-translate-y-0.5 shadow-sm hover:shadow-lg"
              >
                BOOK Your Car
              </a>
            </div>

            {/* left column content only - image moved to right column on large screens */}
          </div>

          {/* Right column: sticky hero image on large screens */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="group aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-gray-200 border border-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80"
                  alt="Luxury Sports Car"
                  className="w-full h-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-100 uppercase tracking-wider mb-1">Featured Model</p>
                    <h3 className="text-2xl font-bold text-white">Porsche 911 GT3 RS</h3>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-200">
                    <span className="font-mono font-bold text-gray-900">$223,800</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-6">
                <div className="w-48 h-48 bg-red-600/10 rounded-full blur-3xl" />
                <div className="w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold">Shop by category</p>
            <h2 className="text-4xl font-light mt-4 text-gray-900">Choose the collection that fits your style</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Explore our featured categories and jump directly to the cars you want.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryOptions.map((category) => (
              <a
                key={category.title}
                href={`/inventory?category=${encodeURIComponent(category.title)}`}
                className="group block overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 transition-shadow hover:shadow-2xl hover:shadow-red-600/10"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] mb-2">{category.title}</p>
                    <h3 className="text-2xl font-semibold">{category.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-red-600 font-semibold">
                    Explore {category.title}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Light Theme */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-light mb-4 text-gray-900">ABOUT US</h2>
            <div className="w-20 h-1 bg-red-600 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1692863211157-9013e04784af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGx1eGVyeSUyMGNhciUyMHNob3clMjByb29tJTIwaW1nZXN8ZW58MHx8MHx8fDA%3D"
                  alt="Classic Car Showroom"
                  className="w-full h-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-110 group-hover:opacity-100 opacity-90"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600/20 rounded-2xl -z-10" />
            </div>

            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-red-50 border border-red-100 rounded-lg">
                <h3 className="text-lg font-semibold text-red-600 tracking-wide">ESTABLISHED 1998</h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                &quot;ELITE MOTORS&quot; IS MORE THAN JUST A DEALERSHIP; WE ARE CURATORS OF AUTOMOTIVE EXCELLENCE.
                OUR COLLECTION FOCUSES ON RARE FINDS, LIMITED EDITIONS, AND INVESTMENT-GRADE VEHICLES.
                WE CONSIDER EVERY DETAIL FROM PROVENANCE TO CONDITION, ENSURING THAT EACH CAR IN OUR
                SHOWROOM MEETS THE HIGHEST STANDARDS OF PERFORMANCE AND LUXURY. WHETHER YOU ARE A
                COLLECTOR OR AN ENTHUSIAST, WE PROVIDE A SEAMLESS ACQUISITION EXPERIENCE WITH
                WHITE-GLOVE SERVICE AND GLOBAL DELIVERY OPTIONS.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-red-200 transition-all shadow-sm hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 group/card cursor-default">
                  <div className="mb-2 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover/card:bg-red-100 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="font-semibold text-gray-900">Certified Authentic</div>
                  <div className="text-sm text-gray-500">Verified history & provenance</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-red-200 transition-all shadow-sm hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 group/card cursor-default">
                  <div className="mb-2 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover/card:bg-red-100 transition-colors">
                    <Gauge className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="font-semibold text-gray-900">Performance Tuned</div>
                  <div className="text-sm text-gray-500">Track-ready specifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Your Car Section */}
      <section id="book" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-light mb-2 text-gray-900">BOOK</h2>
            <h3 className="text-3xl font-light text-gray-500 mb-4">Your Car</h3>
            <div className="w-20 h-1 bg-red-600 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Car Visualizer */}
            <div className="car-card bg-gray-50 rounded-2xl h-[500px] border border-gray-200 relative overflow-hidden group">
              <img
                src="https://media.istockphoto.com/id/187537500/photo/sports-car-in-studio-isolated-on-white-clipping-path.jpg?s=1024x1024&w=is&k=20&c=OyiuiYg6KloWHkEWs7arkUbKRxTDLgF3DbFYJLEEojo="
                alt="Luxury car for test drive"
                className="card-image w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-100 uppercase tracking-wider mb-1">Featured Model</p>
                  <h3 className="text-2xl font-bold text-white">Porsche 911 GT3 RS</h3>
                </div>
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-200">
                  <span className="font-mono font-bold text-gray-900">$223,800</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-6 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                    value={bookingForm.firstName}
                    onChange={(e) => setBookingForm({ ...bookingForm, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                    value={bookingForm.lastName}
                    onChange={(e) => setBookingForm({ ...bookingForm, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700 font-medium">Preferred Model</label>
                <div className="relative">
                  <select
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none"
                    value={bookingForm.carModel}
                    onChange={(e) => setBookingForm({ ...bookingForm, carModel: e.target.value })}
                  >
                    <option value="">Select a vehicle</option>
                    <option value="porsche">Porsche 911 GT3 RS</option>
                    <option value="ferrari">Ferrari F8 Tributo</option>
                    <option value="lambo">Lamborghini Huracan Evo</option>
                    <option value="mclaren">McLaren 720S</option>
                    <option value="mercedes">Mercedes AMG GT Black Series</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">Preferred Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    />
                    <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700 font-medium">Preferred Time</label>
                  <div className="relative">
                    <select
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    >
                      <option value="">Select time</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                    </select>
                    <Clock className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-red-600 border-2 border-red-600 font-bold py-4 rounded-xl hover:bg-red-600 hover:text-white transition-transform duration-600 ease-out transform hover:-translate-y-1 hover:scale-105 shadow-md shadow-red-600/10 hover:shadow-xl hover:shadow-red-600/25 mt-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-100"
              >
                BooKing CONFIRM
              </button>
            </form>

            {bookingStatus.message && (
              <div className={`mt-6 rounded-2xl px-5 py-4 text-sm ${bookingStatus.success ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'} border`}>
                {bookingStatus.message}
              </div>
            )}
          </div>

          {/* Results Section */}
          {showResults && (
            <div id="results" className="mt-12 animate-fade-in">
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-red-600 text-sm mb-2 font-medium uppercase tracking-wider">Appointment Confirmed</div>
                    <div className="text-3xl font-bold text-gray-900">{bookingForm.date || 'TBD'} at {bookingForm.time || 'TBD'}</div>
                    <div className="text-sm text-gray-500 mt-2">Reference ID: #EM-{Math.floor(Math.random() * 10000)}</div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <MapPin className="w-6 h-6 mx-auto mb-2 text-red-600" />
                      <div className="text-xs text-gray-500 mb-1">Location</div>
                      <div className="font-bold text-sm text-gray-900">Beverly Hills</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <svg className="w-6 h-6 mx-auto mb-2 text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <div className="text-xs text-gray-500 mb-1">Specialist</div>
                      <div className="font-bold text-sm text-gray-900">James W.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="px-10 py-4 bg-red-600 text-white border-2 border-red-600 rounded-xl hover:bg-red-700 hover:border-red-700 transition-all font-bold shadow-lg shadow-red-600/20 transform hover:-translate-y-0.5">
                  Add to Calendar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inventory / Ship Pool Section */}
      <section id="inventory" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-light mb-4 text-gray-900">CURRENT INVENTORY</h2>
            <div className="w-20 h-1 bg-red-600 rounded-full" />
          </div>

          {/* Search Filters */}
          <form onSubmit={handleSearch} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all appearance-none text-gray-700"
                value={searchFilters.make}
                onChange={(e) => setSearchFilters({ ...searchFilters, make: e.target.value })}
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
                value={searchFilters.model}
                onChange={(e) => setSearchFilters({ ...searchFilters, model: e.target.value })}
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
                value={searchFilters.yearFrom}
                onChange={(e) => setSearchFilters({ ...searchFilters, yearFrom: e.target.value })}
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
                value={searchFilters.yearTo}
                onChange={(e) => setSearchFilters({ ...searchFilters, yearTo: e.target.value })}
              >
                <option value="">YEAR TO</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </form>

          <div className="flex justify-center mb-12">
            <button
              onClick={handleSearch}
              className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-red-600 transition-all font-bold shadow-lg shadow-gray-900/10 hover:shadow-red-600/20 transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              SEARCH INVENTORY
            </button>
          </div>

          {/* Cars Table */}
          {showInventory && (
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-fade-in shadow-sm">
              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <div className="text-gray-500">Loading inventory...</div>
                </div>
              ) : error ? (
                <div className="p-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-red-600 mx-auto mb-4"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <div className="text-red-600">Failed to load inventory. Please try again.</div>
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
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Price</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {[
                          { name: 'Porsche 911 GT3 RS', year: '2024', miles: '120 mi', cond: 'New', price: '$223,800', status: 'Available' },
                          { name: 'Ferrari F8 Tributo', year: '2023', miles: '1,200 mi', cond: 'Excellent', price: '$285,000', status: 'Reserved' },
                          { name: 'Lamborghini Huracan Evo', year: '2022', miles: '3,500 mi', cond: 'Good', price: '$245,000', status: 'Available' },
                          { name: 'McLaren 720S Spider', year: '2023', miles: '800 mi', cond: 'Like New', price: '$310,000', status: 'Available' },
                          { name: 'Mercedes AMG GT Black', year: '2021', miles: '5,000 mi', cond: 'Good', price: '$325,000', status: 'Sold' }
                        ].map((car, index) => (
                          <tr key={index} className="hover:bg-red-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-red-600">
                            <td className="px-6 py-4">
                              <div className={`w-3 h-3 rounded-full ${car.status === 'Available' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:animate-pulse' : car.status === 'Reserved' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 group-hover:text-red-600 transition-colors relative">
                              {car.name}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 group-hover:text-gray-900 transition-colors">{car.year}</td>
                            <td className="px-6 py-4 text-gray-600 group-hover:text-gray-900 transition-colors">{car.miles}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-200 text-gray-700 group-hover:bg-red-100 group-hover:text-red-700 group-hover:border-red-200 transition-all">{car.cond}</span>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-red-600 transition-colors">{car.price}</td>
                            <td className="px-6 py-4">
                              <button className="text-xs bg-white text-gray-900 border border-gray-300 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white hover:border-red-600 font-semibold transition-all shadow-sm hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-0.5">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-8 flex justify-center border-t border-gray-200">
                    <button className="px-10 py-4 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all font-bold transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/30">
                      Request Full Catalog
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-widest uppercase text-gray-900">Elite<br/>Motors</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Curating the world&apos;s finest automobiles for the discerning collector.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Showroom</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button className="hover:text-red-600 transition">New Arrivals</button></li>
                <li><button className="hover:text-red-600 transition">Sold Gallery</button></li>
                <li><button className="hover:text-red-600 transition">Consignment</button></li>
                <li><button className="hover:text-red-600 transition">Services</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Brands</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button className="hover:text-red-600 transition">Ferrari</button></li>
                <li><button className="hover:text-red-600 transition">Porsche</button></li>
                <li><button className="hover:text-red-600 transition">Lamborghini</button></li>
                <li><button className="hover:text-red-600 transition">McLaren</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  90210 Beverly Hills, CA
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mon-Sat: 10AM - 7PM
                </li>
                <li className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  sales@elitemotors.com
                </li>
              </ul>
            </div>
          </div>

              <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-500 text-sm">
                  &copy; 2024 Elite Motors. All rights reserved.
                </div>
                <div className="flex gap-6 text-sm text-gray-500">
                  <button className="relative group/footer hover:text-red-600 transition-colors font-medium">
                    Privacy Policy
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover/footer:w-full transition-all duration-300"></span>
                  </button>
                  <button className="relative group/footer hover:text-red-600 transition-colors font-medium">
                    Terms of Service
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover/footer:w-full transition-all duration-300"></span>
                  </button>
                </div>
              </div>
        </div>
      </footer>
    </div>
  );
}
