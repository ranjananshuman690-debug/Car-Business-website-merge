import mongoose from 'mongoose'

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Car name is required'],
      trim: true,
    },
    make: {
      type: String,
      required: [true, 'Make is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear() + 1, 'Invalid year'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    miles: {
      type: Number,
      default: 0,
      min: [0, 'Miles cannot be negative'],
    },
    engine: {
      type: String,
      trim: true,
      default: '',
    },
    power: {
      type: String,
      trim: true,
      default: '',
    },
    transmission: {
      type: String,
      trim: true,
      default: '',
    },
    condition: {
      type: String,
      enum: ['New', 'Like New', 'Excellent', 'Good', 'Fair'],
      default: 'Good',
    },
    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Sold'],
      default: 'Available',
    },
    category: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

carSchema.index({ make: 1, model: 1 })
carSchema.index({ category: 1 })
carSchema.index({ status: 1 })
carSchema.index({ price: 1 })
carSchema.index({ year: -1 })

const Car = mongoose.models.Car || mongoose.model('Car', carSchema)

export default Car
