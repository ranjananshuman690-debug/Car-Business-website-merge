import Car from '@/models/Car'
import { validateCarData } from '@/lib/validation'
import { CAR_CATEGORIES, DEFAULT_CAR_IMAGE, CARS_PER_PAGE } from '@/utils/constants'

const seedCars = [
  {
    name: 'Porsche 911 GT3 RS',
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    price: 223800,
    miles: 120,
    engine: '4.0L Flat-6',
    power: '518 HP',
    transmission: 'PDK 7-Speed',
    condition: 'New',
    status: 'Available',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=1200&auto=format&fit=crop&q=80',
    description: 'The pinnacle of Porsche sports car engineering. The 911 GT3 RS delivers uncompromising track performance with street usability.',
    features: ['Carbon ceramic brakes', 'Active aerodynamics', 'Lightweight construction'],
  },
  {
    name: 'Ferrari F8 Tributo',
    make: 'Ferrari',
    model: 'F8 Tributo',
    year: 2023,
    price: 285000,
    miles: 1200,
    engine: '3.9L Twin-Turbo V8',
    power: '710 HP',
    transmission: '7-Speed Dual-Clutch',
    condition: 'Excellent',
    status: 'Reserved',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&auto=format&fit=crop&q=80',
    description: 'The F8 Tributo represents the essence of Ferrari. Its twin-turbo V8 produces 710 HP of pure automotive emotion.',
    features: ['Side slip control', 'F1-Trac', 'E-Diff 3.0'],
  },
  {
    name: 'Lamborghini Huracan Evo',
    make: 'Lamborghini',
    model: 'Huracan Evo',
    year: 2022,
    price: 245000,
    miles: 3500,
    engine: '5.2L V10',
    power: '630 HP',
    transmission: '7-Speed LDF',
    condition: 'Good',
    status: 'Available',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&auto=format&fit=crop&q=80',
    description: 'Naturally aspirated V10 perfection. The Huracan Evo delivers a visceral driving experience with unmistakable Lamborghini presence.',
    features: ['LDVI system', 'Carbon fiber body', 'MagneRide suspension'],
  },
  {
    name: 'McLaren 720S Spider',
    make: 'McLaren',
    model: '720S Spider',
    year: 2023,
    price: 310000,
    miles: 800,
    engine: '4.0L Twin-Turbo V8',
    power: '710 HP',
    transmission: '7-Speed SSG',
    condition: 'Like New',
    status: 'Available',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&auto=format&fit=crop&q=80',
    description: 'Open-top supercar excellence. The 720S Spider combines breathtaking performance with the joy of open-air motoring.',
    features: ['Dihedral doors', 'Carbon fiber tub', 'Pro-active damping'],
  },
  {
    name: 'Mercedes AMG GT Black',
    make: 'Mercedes',
    model: 'AMG GT Black Series',
    year: 2021,
    price: 325000,
    miles: 5000,
    engine: '4.0L V8 Biturbo',
    power: '720 HP',
    transmission: '7-Speed AMG Speedshift',
    condition: 'Good',
    status: 'Sold',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=80',
    description: 'The most powerful AMG V8 ever. Track-bred, road-legal, and absolutely stunning.',
    features: ['AMG active aerofoil', 'Carbon fiber panels', 'Track mode'],
  },
  {
    name: 'Porsche 911 Carrera',
    make: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    price: 106000,
    miles: 2100,
    engine: '3.0L Turbo Flat-6',
    power: '379 HP',
    transmission: '8-Speed PDK',
    condition: 'Like New',
    status: 'Available',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=1200&auto=format&fit=crop&q=80',
    description: 'The iconic 911 Carrera. Timeless design meets modern performance in Porsche\'s most celebrated sports car.',
    features: ['Sport Chrono package', 'PASM', 'Bose surround sound'],
  },
  {
    name: 'Ferrari Roma',
    make: 'Ferrari',
    model: 'Roma',
    year: 2024,
    price: 246000,
    miles: 500,
    engine: '3.9L Twin-Turbo V8',
    power: '612 HP',
    transmission: '8-Speed Dual-Clutch',
    condition: 'New',
    status: 'Available',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&auto=format&fit=crop&q=80',
    description: 'La Nuova Dolce Vita. The Roma reinterprets the classic Ferrari grand touring experience with modern elegance.',
    features: ['Rear-wheel steering', '8-speed DCT', 'Digital cockpit'],
  },
  {
    name: 'Lamborghini Aventador SVJ',
    make: 'Lamborghini',
    model: 'Aventador SVJ',
    year: 2020,
    price: 517000,
    miles: 1200,
    engine: '6.5L V12',
    power: '770 HP',
    transmission: '7-Speed ISR',
    condition: 'Excellent',
    status: 'Available',
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&auto=format&fit=crop&q=80',
    description: 'The final V12 Lamborghini. The Aventador SVJ is the ultimate expression of Lamborghini\'s naturally aspirated legacy.',
    features: ['ALA 2.0', 'Carbon fiber monocoque', '750+ HP V12'],
  },
]

export async function seedCarsIfEmpty() {
  const count = await Car.countDocuments()
  if (count === 0) {
    await Car.insertMany(seedCars)
    console.log('Database seeded with sample cars')
  }
}

export async function getAllCars(filters = {}) {
  const query = {}

  if (filters.make) {
    query.make = new RegExp(`^${filters.make}$`, 'i')
  }
  if (filters.model) {
    query.model = new RegExp(`^${filters.model}$`, 'i')
  }
  if (filters.category) {
    query.category = filters.category
  }
  if (filters.yearFrom) {
    query.year = { ...query.year, $gte: Number(filters.yearFrom) }
  }
  if (filters.yearTo) {
    query.year = { ...query.year, $lte: Number(filters.yearTo) }
  }
  if (filters.status) {
    query.status = filters.status
  }
  if (filters.minPrice) {
    query.price = { ...query.price, $gte: Number(filters.minPrice) }
  }
  if (filters.maxPrice) {
    query.price = { ...query.price, $lte: Number(filters.maxPrice) }
  }

  const page = Number(filters.page) || 1
  const limit = Number(filters.limit) || CARS_PER_PAGE
  const skip = (page - 1) * limit

  const total = await Car.countDocuments(query)
  const cars = await Car.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  return {
    data: cars,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getCarById(id) {
  const car = await Car.findById(id).lean()
  return car
}

export async function createCar(data) {
  const { isValid, errors } = validateCarData(data)
  if (!isValid) {
    return { success: false, message: 'Validation failed', errors }
  }

  const car = new Car({
    ...data,
    image: data.image || DEFAULT_CAR_IMAGE,
    images: data.images || [],
  })

  const savedCar = await car.save()
  return {
    success: true,
    message: 'Car created successfully',
    data: savedCar.toJSON ? savedCar.toJSON() : savedCar,
  }
}

export async function updateCar(id, data) {
  const car = await Car.findById(id)
  if (!car) {
    return { success: false, message: 'Car not found' }
  }

  Object.assign(car, data)
  const updatedCar = await car.save()
  return {
    success: true,
    message: 'Car updated successfully',
    data: updatedCar.toJSON ? updatedCar.toJSON() : updatedCar,
  }
}

export async function deleteCar(id) {
  const car = await Car.findById(id)
  if (!car) {
    return { success: false, message: 'Car not found' }
  }

  await Car.findByIdAndDelete(id)
  return {
    success: true,
    message: 'Car deleted successfully',
  }
}

export async function getCategories() {
  const categories = await Car.aggregate([
    { $match: { category: { $ne: '', $exists: true } } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ])

  return categories.reduce((acc, cat) => {
    acc[cat._id] = cat.count
    return acc
  }, {})
}

export async function getAllMakes() {
  const makes = await Car.distinct('make')
  return makes.filter(Boolean)
}

export async function getAllModels() {
  const models = await Car.distinct('model')
  return models.filter(Boolean)
}
