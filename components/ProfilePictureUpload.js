'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Upload, X, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getAuthHeaders } from '@/lib/auth'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024

export default function ProfilePictureUpload({ profilePicture, userName, size = 'lg', onSuccess }) {
  const { refreshUser } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!profilePicture) {
      setPreview(null)
    }
  }, [profilePicture])

  const getInitials = () => {
    if (!userName) return 'U'
    const parts = userName.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return userName.trim().charAt(0).toUpperCase()
  }

  const validateFile = (file) => {
    if (!file) {
      setError('No file selected')
      return false
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Only JPG, JPEG, PNG and WebP are allowed.')
      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit.')
      return false
    }

    setError('')
    return true
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!validateFile(file)) {
      e.target.value = ''
      return
    }

    setSelectedFile(file)
    setSuccess('')
    setError('')

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('profilePicture', selectedFile)

      const headers = getAuthHeaders()
      delete headers['Content-Type']

      const res = await fetch('/api/auth/profile-picture', {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to upload profile picture')
      }

      setSuccess('Profile picture updated successfully')
      setPreview(null)
      setSelectedFile(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      await refreshUser()
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    setIsUploading(true)
    setError('')
    setSuccess('')

    try {
      const headers = getAuthHeaders()

      const res = await fetch('/api/auth/profile-picture', {
        method: 'DELETE',
        headers,
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to remove profile picture')
      }

      setPreview(null)
      setSelectedFile(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      await refreshUser()
      if (onSuccess) onSuccess()
      setSuccess('Profile picture removed successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    setSelectedFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const sizeClasses = size === 'lg' ? 'w-24 h-24' : 'w-20 h-20'
  const iconSize = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div
          className={`${sizeClasses} rounded-full overflow-hidden bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/30`}
        >
          {preview || profilePicture ? (
            <img
              src={preview || profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className={size === 'lg' ? 'text-3xl' : 'text-2xl'}>{getInitials()}</span>
          )}
        </div>

        {!preview && !isUploading && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-md"
            title="Change profile picture"
          >
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">Preview ready</p>
          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload
                </>
              )}
            </button>
            <button
              onClick={clearPreview}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {profilePicture && !preview && !isUploading && (
        <button
          onClick={handleRemove}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Remove photo
        </button>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm">
          {success}
        </div>
      )}
    </div>
  )
}
