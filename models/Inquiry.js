import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    carModel: {
      type: String,
      required: [true, 'Car model is required'],
      trim: true,
    },
    date: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'completed', 'cancelled'],
      default: 'pending',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

inquirySchema.index({ email: 1 })
inquirySchema.index({ status: 1 })
inquirySchema.index({ createdAt: -1 })

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema)

export default Inquiry
